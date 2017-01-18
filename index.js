#!/usr/bin/env node

'use strict';

const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const program = require('commander');
const prompt = require('prompt');

const Package = require('./package.json');
const copy = require('./lib/copy');

let cwd = process.cwd();
let pictorBase = `${__dirname}/src/base`;
let pictorScss = `${__dirname}/src/app.scss`;

let copyTo;
let filename;
let dirname;
let overwrite;

program
    .version(Package.version)
    // .command('*')
    .option('-f, --filename <filename>', 'name of SCSS entry file. Should not exist. Default is "app.scss"')
    .option('-d, --dirname <dirname>', 'name of base directory. Should not exist. Default is "base"')
    .option('-o, --overwrite [bool]', 'overwrite files if they already exist', parseInt)
    .description('Copy Pictor files to path')
    .action((copyPath, options) => {

        copyTo = copyPath;
        filename = options.filename || 'app.scss';
        dirname = options.dirname || 'base';
        overwrite = options.overwrite || null;

    });


copyPath = path.resolve(copyPath);
const copyPathExists = fs.existsSync(copyTo);
const copyPathIsDirectory = fs.lstatSync(copyTo).isDirectory();

const sassDir = path.resolve(copyTo, dirname);
const sassDirExists = fs.existsSync(sassDir);
const sassDirIsDirectory = fs.lstatSync(sassDir).isDirectory();

const sassFile = path.resolve(copyTo, filename);
const sassFileExists = fs.existsSync(sassFile);
const sassFileIsFile = fs.lstatSync(sassFile).isFile();

if (!copyTo) {
    console.log(chalk.red(copyTo, 'does not exists'));
    return 1;
}

if (copyPathExists && copyPathIsDirectory) {

    if (!sassFileExists || (sassFileExists && !sassFileIsFile)) {

        if (overwrite === null) {

            prompt.start();

            prompt.get(`overwite ${filename}?`, () => {

            });

        }

        copy(pictorScss, sassFile);
        console.log(chalk.green(`${options.filename} was created`));

    } else {
        console.log(chalk.red(`${options.filename} already exists`));
    }

    if (!sassDirExists || (sassDirExists && !sassDirIsDirectory)) {

        copy(pictorBase, copyTo);
        console.log(chalk.green(`${options.filename} was created`));

    } else {
        console.log(chalk.red(`${options.dirname} already exists`));
    }


} else {
    console.log(chalk.red(copyTo, 'does not exists'))
}


program.parse(process.argv);
