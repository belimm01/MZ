import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        fileContent: '',
        fileName: '',
        jsonContent : '',
    },
    mutations: {
        changeFileContent(state, fileContent) {
            state.fileContent = fileContent
        },
        changeFileName(state, fileName) {
            state.fileName = fileName
        },
        changeInputJsonContent(state, jsonContent) {
            state.jsonContent = jsonContent
        }
    },
    getters: {
        fileContent: state => state.fileContent,
        fileName: state => state.fileName,
        jsonContent: state => state.jsonContent,
    }
});