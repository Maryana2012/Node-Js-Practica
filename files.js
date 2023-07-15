const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");
const dataValidator = require("./helpers/dataValidator");
const checkExtension = require("./helpers/checkExtention");

const createFile = async (fileName, content) => {
    const file = {
        fileName,
        content
    }
    const {error}=  dataValidator(file);
     if (error) {
        const test = chalk.red(`Please specify ${error.details[0].path} parameter`);
        console.log(test);
        return;
    }

}

module.exports = {
    createFile,
}