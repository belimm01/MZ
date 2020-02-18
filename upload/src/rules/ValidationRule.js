import {defaultObject} from '../statics/const'

const mergeJsons = (json1, json2) => {
    return Object.assign(json1, json2);
};

// const modifyJson = (json) => {
//     if (json.multiple === 'true') {
//         json.multiple = 'block';
//     } else {
//         json.multiple = 'none';
//     }
//     return json;
// };

export let validateJson = (inputJson) => {
    const defaultJson = Object.assign({}, defaultObject, {});
    return  mergeJsons(defaultJson, inputJson);
    // return modifyJson(mergedJson);
};
