function updateUserAccreditationWithUploadState(oldJsonContent, fileUploadList) {
    let modifyJsonContent = oldJsonContent;
    modifyJsonContent.upload = {};
    modifyJsonContent.upload.uploadedFiles = [];
    modifyJsonContent.state.upload = true;
    modifyJsonContent.upload.uploadedDate = Date.now();
    return createFilesArray(modifyJsonContent, fileUploadList)
}

let createFilesArray = (newJsonContent, fileUploadList) => {
    let uploadedFiles = [];
    for (let i = 0; i < fileUploadList.length; i++) {
        uploadedFiles[i] = fileUploadList[i].fileName;
    }
    newJsonContent.upload.uploadedFiles.push([...new Set(uploadedFiles)]);
    return newJsonContent;
};

export {updateUserAccreditationWithUploadState};