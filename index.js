const argv = require('yargs').argv;
const {createFile, getFiles, getInfo} = require("./files.js");

// TODO: рефакторити
function invokeAction({ action, fileName, content }) {
  switch (action) {
      case 'create':
          createFile(fileName, content);
      break;

    case 'getFiles':
      getFiles() 
    break;

    case 'getInfo':
      getInfo(fileName)
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);