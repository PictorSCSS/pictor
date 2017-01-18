'use strict';

const path = require('path');
const fs = require('fs');

module.exports = function copyRecursiveSync (src, dest, err) {

    const exists = fs.existsSync(src);
    const stats = exists && fs.lstatSync(src);
    const isDirectory = exists && stats.isDirectory();
    const isFile = exists && stats.isFile();

    if (exists) {
        if (isDirectory) {
            fs.mkdirSync(dest);
            fs.readdirSync(src).forEach(function(childItemName) {

                copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));

            });
        }

        if (isFile) {
            const data = fs.readFileSync(src, 'utf-8');
            fs.writeFileSync(dest, data, 'utf-8');
        }
    } else {

        err(new Error('Folder or file does not exist'));

    }
};
