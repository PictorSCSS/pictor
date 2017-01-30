'use strict';

const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

module.exports = function copyRecursiveSync (src, dest) {

    const srcExists = fs.existsSync(src);
    const destExists = fs.existsSync(dest);
    const stats = srcExists && fs.lstatSync(src);
    const isDirectory = srcExists && stats.isDirectory();
    const isFile = srcExists && stats.isFile();

    if (destExists) {

        console.log(chalk.red('already exists ' + dest));
        return;
    }

    if (isDirectory) {
        fs.mkdirSync(dest);

        fs.readdirSync(src).forEach(function(childItemName) {

            copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));

        });
    }

    if (isFile) {

        fs.writeFileSync(dest, fs.readFileSync(src, 'utf-8'), 'utf-8');
    }

    console.log(chalk.green('created ' + dest));

};
