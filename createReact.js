
const chalk = require('chalk');
var inquirer = require('inquirer');
var shell = require('shelljs');
const fs = require('fs-extra');

async function init() {
    if (!shell.which('npm')) {
        shell.echo('Please install npm first');;
        shell.exit(1);
    }

    var question = [
        {
            type: 'input',
            name: 'project_name',
            message: 'package name:',
            default: 'myapp'
        },
        {
            type: 'input',
            name: 'version',
            message: 'version:',
            default: '1.0.0'
        },
        {
            type: 'input',
            name: 'license',
            message: 'license:',
            default: 'MIT'
        },
        {
            type: 'input',
            name: 'author',
            message: 'author:',
            default: ''
        },
        {
            type: 'input',
            name: 'description',
            message: 'description',
            default: ''
        },
        {
            type: 'list',
            name: 'install',
            message: 'Do you want to install the packages?',
            choices: ['Yes', 'No'],
            default: 'Yes'
        }
    ];
    inquirer
        .prompt(question)
        .then(copyFile);
}

function copyFile(answers) {
    shell.cp('-r', __dirname + '/template', answers.project_name);
    shell.cd(answers.project_name);
    readInfo(answers);
}

function readInfo(info) {
    fs.readJson('./package.json', (err, packageObj) => {
        if (err) {
            throw err;
        }
        packageObj.name = info.project_name;
        packageObj.version = info.version;
        packageObj.license = info.license;
        packageObj.author = info.author;
        packageObj.description = info.description;
        fs.writeJson('./package.json', packageObj, { spaces: 4 }, err => {
            if (err) {
                throw err;
            }
            if (info.install === 'Yes') {
                console.log(`${chalk.yellow('Installing packages. This might take a couple of minutes.')}`)
                npmInstall()
            }
            else {
                console.log(`${chalk.green('Done.')}`)
                shell.exit(0)
            }
        })
    })
}

function npmInstall() {
    if (!shell.which('yarn')) {
        console.log(`${chalk.red('need yarn to install packages')}`)
        const hasYarn = [
            {
                type: 'list',
                name: 'install_yarn',
                message: 'Do you want to install yarn?',
                choices: ['Yes', 'No'],
                default: 'Yes'
            }
        ]
        inquirer
            .prompt(hasYarn)
            .then(yarnInstall);
    }
    else {
        shell.exec('yarn install', {
            async: true
        }, function (code) {
            if (code == 0) {
                console.log(`${chalk.green('yarn install sucessfully')}`)
                shell.exit(0)
            }
            else {
                console.log(`${chalk.red('yarn install failed, please try it manually')}`)
                shell.exit(1)
            }
        })
    }
}

function yarnInstall(info) {
    if (info.install_yarn === 'Yes') {
        shell.exec('npm install -g yarn', {
            async: true
        }, function (code) {
            if (code == 0)
                npmInstall
            else {
                console.log(`${chalk.red('can not install yarn')}`)
                shell.exit(1)
            }
        })
    }
}

module.exports = {
    init
};