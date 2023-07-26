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
    const checkName = checkExtension(fileName)
    if(!checkName.result){
         const test = chalk.red(`Sorry, this APP doesn't support ${checkName.extension} this extension`);
        console.log(test);
        return;
    }
    const pathName = path.join(__dirname, "./files", fileName);
    await fs.writeFile(pathName, content, "utf-8")
    const test = chalk.blue(`File was created`);
        console.log(test);
}

const getFiles = async () => {
const pathDir = path.join(__dirname, "./files");
const dir = await fs.readdir(pathDir)

if(dir.length === 0){
    const test2 = chalk.red(`No files`);
        console.log(test2);
        return
}
console.log(dir);
}

const getFileInfo = async (fileName) => {
    const pathName = path.join(__dirname, "./files", fileName);
    const pathDir = path.join(__dirname, "./files");
    const dir = await fs.readdir(pathDir);
    

    if (dir.includes(fileName)) {
        const indexName = fileName.indexOf('.');

        const name = fileName.slice(0, indexName);
        const extension = fileName.slice(indexName+1)
        const content = await  fs.readFile(pathName)
            .then(data =>  data.toString())
            .catch(err => console.log(err.message));
        
        const dataFile = {
            name,
            extension,
            content
        }
        console.log(dataFile);
    }
    const notFile = chalk.red(`File ${fileName} isn't in this directory`);
    console.log(notFile);
}

module.exports = {
    createFile,
    getFiles,
    getFileInfo
}