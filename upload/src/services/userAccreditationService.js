function updateUserAccreditationWithUploadState(oldJsonContent, fileUploadList) {
    let modifyJsonContent = oldJsonContent;
    modifyJsonContent.upload = {};
    modifyJsonContent.upload.uploadedFiles = [];
    modifyJsonContent.state.upload = true;
    modifyJsonContent.upload.uploadedDate = Date.now();
    return createFilesArray(modifyJsonContent, fileUploadList)
}

let createFilesArray = (newJsonContent, fileUploadList) => {
    newJsonContent.upload.uploadedFiles = [];
    for (let i = 0; i < fileUploadList.length; i++) {
        newJsonContent.upload.uploadedFiles[i] = fileUploadList[i].fileName;
    }
    return newJsonContent;
};

export {updateUserAccreditationWithUploadState};