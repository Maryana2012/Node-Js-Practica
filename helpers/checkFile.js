const checkFile = (fileName) => {
    const EXTENSIONS = ['js', 'json', "html", 'css', 'txt'];

    const index = fileName.lastIndexOf('.');
    const extension = fileName.slice(index + 1);
    // const finded = EXTENTIONS.find(() => { extention });
    const result = EXTENSIONS.some(el => el === extension);
  
    const object = {
        extension, 
        result,
    }
    return object;    


}

module.exports = checkExtension;