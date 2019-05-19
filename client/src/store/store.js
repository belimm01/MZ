import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        fileContent: '',
        fileName: '',
        jsonContent: '',
        info: '',
    },
    mutations: {
        changeFileContent(ctx, fileContent) {
            ctx.fileContent = fileContent
        },
        changeFileName(ctx, fileName) {
            ctx.fileName = fileName
        },
        changeInputJson(ctx, jsonContent) {
            ctx.jsonContent = jsonContent
        },
        changeInputJsonInfo(ctx, info) {
            ctx.jsonContent = info
        }
    },
});

export default store