import owncloud from 'js-owncloud-client';

const oc = new owncloud('http://localhost/');

const isFolderExist = async (folderName) => {
    let fileList = await oc.files.list("Documents/");
    for (let i = 0; i < fileList.length; i++) {
        if (!fileList[i].name.includes("Documents/" + folderName)) {
            return true;
        }
    }
    return false;
};

const createFolder = async (folderName) => {
    await oc.files.mkdir(folderName);
};

const uploadFiles = async (folderName, files) => {
    for (let i = 0; i < files.length; i++) {
        await oc.files.putFileContents(folderName + files[i].fileName, files[i].fileContent);
    }
};

const login = async () => {
    await oc.login('admin', 'admin');
};

export {isFolderExist, createFolder, uploadFiles, login}