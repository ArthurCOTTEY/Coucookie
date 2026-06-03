import { minify as terserMinify } from 'terser';
import CleanCSS from 'clean-css';
import fs from 'node:fs/promises';
import path from 'node:path';

const srcDir = './src';
const distDir = './dist';
const readmePath = './README.md';

function formatBytes(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function getReductionPercent(originalSize, minifiedSize) {
    if (originalSize === 0) return '0%';

    const reduction = ((originalSize - minifiedSize) / originalSize) * 100;
    return `${reduction.toFixed(2)}%`;
}

async function updateReadme(results) {
    let readme = '';

    try {
        readme = await fs.readFile(readmePath, 'utf8');
    } catch {
        readme = '# Coucookie\n';
    }

    const table = [
        '<!-- MINIFY-STATS:START -->',
        '## Build size',
        '',
        '| File | Original | Minified | Reduction |',
        '|---|---:|---:|---:|',
        ...results.map(result => (
            `| ${result.file} | ${result.originalSize} | ${result.minifiedSize} | ${result.reduction} |`
        )),
        '<!-- MINIFY-STATS:END -->'
    ].join('\n');

    const regex = /<!-- MINIFY-STATS:START -->[\s\S]*?<!-- MINIFY-STATS:END -->/;

    readme = regex.test(readme)
        ? readme.replace(regex, table)
        : `${readme.trim()}\n\n${table}\n`;

    await fs.writeFile(readmePath, readme, 'utf8');
}

async function minifyJs(filePath) {
    const code = await fs.readFile(filePath, 'utf8');

    const result = await terserMinify(code, {
        compress: true,

        // Important :
        // On évite le renommage agressif pour ne pas casser les fonctions exposées sur window
        mangle: false,

        format: {
            comments: false
        }
    });

    if (!result.code) {
        throw new Error('Terser n’a pas retourné de code minifié.');
    }

    return result.code;
}

async function minifyCss(filePath) {
    const code = await fs.readFile(filePath, 'utf8');

    const result = new CleanCSS({
        level: 2
    }).minify(code);

    if (result.errors.length) {
        throw new Error(result.errors.join('\n'));
    }

    return result.styles;
}

async function build() {
    await fs.mkdir(distDir, { recursive: true });

    const files = await fs.readdir(srcDir);
    const results = [];

    for (const file of files) {
        const extension = path.extname(file);

        if (!['.js', '.css'].includes(extension)) {
            continue;
        }

        const filePath = path.join(srcDir, file);
        const distPath = path.join(
            distDir,
            file.replace(extension, `.min${extension}`)
        );

        try {
            const minifiedData = extension === '.js'
                ? await minifyJs(filePath)
                : await minifyCss(filePath);

            await fs.writeFile(distPath, minifiedData, 'utf8');

            const originalStats = await fs.stat(filePath);
            const minifiedStats = await fs.stat(distPath);

            results.push({
                file,
                originalSize: formatBytes(originalStats.size),
                minifiedSize: formatBytes(minifiedStats.size),
                reduction: getReductionPercent(originalStats.size, minifiedStats.size)
            });

            console.log(`Minifié : ${file} -> ${path.basename(distPath)}`);
        } catch (err) {
            console.error(`Erreur avec ${file}:`, err.message);
        }
    }

    await updateReadme(results);

    console.log('README.md mis à jour.');
}

build();