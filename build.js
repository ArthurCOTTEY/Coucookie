const fs = require('fs')
const path = require("node:path");

const srcDir = './src/'
const distDir = './dist/'

fs.readdir(srcDir, (err, files) => {
    files.forEach(file => {

        const extension = path.extname(file)
        console.log(extension)
        const filePath = `${srcDir}/${file}`
        const distPath = `${distDir}/${file.replace(extension, '.min'+extension)}`

        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log(err)
            } else {
                fs.writeFile(distPath, data, err => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log(data)
                    }
                })
            }
        })

    })
})