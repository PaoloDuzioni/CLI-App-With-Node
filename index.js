#!/usr/bin/env node

const inquirer = require('inquirer'); // Interactive user interfaces
const chalk = require('chalk'); // String Styling
const figlet = require('figlet'); // ASCII Art for Letters
const shell = require('shelljs'); // Portable Unix Shell commands fir Node.js

// FUNCTIONS
const init = () => {
    console.log(
        chalk.green(
            figlet.textSync("PD Creator", {
                font: "Standard",
                horizontalLayout: "default",
                verticalLayout: "default"
            })
        ) 
    ); 

    console.log(
        chalk.white(`Create your file (Ctrl + C to exit):\n`)
    ); 
};

const askQuestions = () => {
    const questions = [
        {
            name: "FILENAME",
            type: "input",
            message: "What is the name of the file whitout extension?"
        },
        {
            name: "EXTENSION",
            type: "list",
            message: "What is the file extension?",
            choices: [".html", ".js", ".php", ".css", ".scss"],
            filter: function(val){
                return val.split(".")[1];
            }
        }
    ];
    return inquirer.prompt(questions);
};

const createFile = (filename, extension) => {
    const filePath = `${process.cwd()}/${filename}.${extension}`;
    shell.touch(filePath);
    return filePath;
};

const success = (filepath) => {
    console.log(
        chalk.cyan(`Done! FIle created at {underline ${filepath}}`)
    ); 
};


// RUN SCRIPT
const run = async () => {
    // Script introduction
    init();

    // Ask questions
    const answers = await askQuestions();
    const { FILENAME, EXTENSION } = answers;
    
    // Create the file
    const filePath = createFile(FILENAME, EXTENSION);

    // show success message
    success(filePath);
};

run();