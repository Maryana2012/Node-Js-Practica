const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");
const dataValidator = require("./helpers/dataValidator");
const checkExtension = require("./helpers/checkExtention");

const createFile = async (fileName, content) => {
  const file = {
    fileName,
    content,
  };
  const { error } = dataValidator(file);
  if (error) {
    const test = chalk.red(`Please specify ${error.details[0].path} parameter`);
    console.log(test);
    return;
  }
  const checkName = checkExtension(fileName);
  if (!checkName.result) {
    const test = chalk.red(
      `Sorry, this APP doesn't support ${checkName.extension} this extension`
    );
    console.log(test);
    return;
  }
  const pathName = path.join(__dirname, "./files", fileName);
  await fs.writeFile(pathName, content, "utf-8");
  const test = chalk.blue(`File was created`);
  console.log(test);
};

const getFiles = async () => {
  const pathDir = path.join(__dirname, "./files");
  const dir = await fs.readdir(pathDir);

  if (dir.length === 0) {
    const test2 = chalk.red(`No files`);
    console.log(test2);
    return;
  }
  console.log(dir);
};

// прочитати директорію files,
// функція в якості аргументу приймає назву файлу
// зробити перевірку чи є в папці файл, назва якого прийшла як параметер
// файл НЕ знайдено --> повідомлення: "файл з такою назвою не знайдено"
// файл знайдено --> {fileName (path->baseName....), extension, вміст (fs.readFile)}

const getInfo = async (fileName) => {
  const pathDir = path.join(__dirname, "./files");
  const FILES = await fs.readdir(pathDir);
  if (FILES.length === 0) {
    return console.log(chalk.red(`No files`));
  }
  const result = FILES.some((el) => el === fileName);
  if (!result) {
    return console.log(chalk.red(`file ${fileName} not found`));
  }
  const filePath = path.join(pathDir, fileName);
  try {
    const index = fileName.lastIndexOf(".");
    const extension = fileName.slice(index + 1);
    const name = fileName.replace(`.${extension}`, "");
    const contentFile = await fs.readFile(filePath, "utf-8");
    const object = {
      name,
      extension,
      contentFile,
    };
    console.log(object);
  } catch (err) {
    console.error(chalk.red(`Error reading file: ${fileName}`));
  }
};

module.exports = {
  createFile,
  getFiles,
  getInfo,
};

// node index --action getInfo --queryFileName  xxx.js
