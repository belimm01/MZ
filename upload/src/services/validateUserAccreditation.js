import {defaultObject} from '../statics/userAccreditationFormItem'

const mergeJsons = (json1, json2) => {
    return Object.assign(json1, json2);
};

let validateJson = (userAccreditationFormItem) => {
    const defaultJson = Object.assign({}, defaultObject, {});
    return mergeJsons(defaultJson, userAccreditationFormItem);
};

let parseJson = (userAccreditationForms) => {
    let result = [];
    for (let i = 0; i < userAccreditationForms.form.length; i++) {
        let form = [];
        let items = [];
        for (let z = 0; z < userAccreditationForms.form[i].items.length; z++) {
            const item = validateJson(userAccreditationForms.form[i].items[z]);
            item.uploads = [];
            item.uploads.push({});
            items.push(item);
        }
        form.groupName = userAccreditationForms.form[i].groupName;
        form.items = items;
        result.push(form);
    }
    return result;
};

export {parseJson};