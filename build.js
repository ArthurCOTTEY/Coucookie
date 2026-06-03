import { minify } from 'minify';
import fs from 'node:fs/promises';
import path from 'node:path';

const srcDir = './src';
const distDir = './dist';

async function build() {
    await fs.mkdir(distDir, { recursive: true });

    const files = await fs.readdir(srcDir);

    for (const file of files) {
        const extension = path.extname(file);

        if (extension !== '.js' && extension !== '.css') {
            continue;
        }

        const filePath = path.join(srcDir, file);
        const distPath = path.join(
            distDir,
            file.replace(extension, `.min${extension}`)
        );

        try {
            const minifyData = await minify(filePath);

            await fs.writeFile(distPath, minifyData, 'utf8');

            console.log(`Minifié : ${file} -> ${path.basename(distPath)}`);
        } catch (err) {
            console.error(`Erreur avec ${file}:`, err.message);
        }
    }
}

build();