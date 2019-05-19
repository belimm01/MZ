import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        fileContent: '',
        fileName: '',
        jsonContent : '',
    },
    mutations: {
        changeFileContent(ctx, fileContent) {
            ctx.fileContent = fileContent
        },
        changeFileName(ctx, fileName) {
            ctx.fileName = fileName
        },
        changeInputJsonContent(ctx, jsonContent) {
            ctx.jsonContent = jsonContent
        }
    },
});

export default store