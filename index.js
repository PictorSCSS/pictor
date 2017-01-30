#!/usr/bin/env node

'use strict';

const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const program = require('commander');
const prompt = require('prompt');
const async = require('async');

const Package = require('./package.json');
const copy = require('./lib/copy');

let cwd = process.cwd();
let pictorFolder = `${__dirname}/src/base`;
let pictorFile = `${__dirname}/src/pictor.scss`;

const cp = {
    to: null,
    filename: null,
    dirname: null,
    overwrite: null,
}


/**
 * Copies Pictor files to current location
 * @param {String} which - 'file' or 'folder'
 * @param {Function} callback - Success callback
 * @param {Function} error - Error callback
 */
function copyFile () {

    const dest = {
        file: path.resolve(cp.to, cp.filename),
        folder: path.resolve(cp.to, cp.dirname)
    };

    const src = {
        file: pictorFile,
        folder: pictorFolder
    }

    copy(src['file'], dest['file']);
    copy(src['folder'], dest['folder']);

}


program
    .version(Package.version)
    .option('-f, --filename <filename>', 'name of SCSS entry file. Should not exist. Default is "app.scss"')
    .option('-d, --dirname <dirname>', 'name of base directory. Should not exist. Default is "base"')
    .option('-o, --overwrite [bool]', 'overwrite files if they already exist', parseInt)
    .description('Copy Pictor files to path')
    .action((copyPath, options) => {

        Object.assign(cp, {

            to: path.resolve(copyPath),
            filename: options.filename || 'app.scss',
            dirname: options.dirname || 'base',
            overwrite: options.overwrite || null

        });

        copyFile();
        console.log(chalk.blue('Pictor finished.'));

    });

program.parse(process.argv);
