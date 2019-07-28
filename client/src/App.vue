<template>
    <div id="app">
        <Header/>
        <div class="container">
            <div class="row">
                <div class="col-sm">
                    <h1>Elektronická podatelna MZČR</h1>
                </div>
            </div>
            <br>
        </div>
        <form @submit.prevent="uploadFile">
            <div v-for="form in forms">
                <div class="row">
                    <div class="col-sm">
                        <h3>{{form.groupName}}</h3>
                    </div>
                    <br>
                </div>
                <div v-for="(item,index) in form.items">
                    <Upload v-bind:key="index"
                            :rel="item.label"
                            :multiple="item.multiple"
                            :label="item.label"
                            :maxSize="item.maxSize"
                            :description="item.description"
                            :required="item.required"
                            :acceptFormats="item.acceptFormats"
                            :tags="item.tags"
                            @getFileContent="getFileFromChildComponent"
                            @isInput="addInput"
                    />
                </div>
            </div>
            <div class="row">
                <div class="col-sm">
                    <b-button type="submit" variant="primary">Save</b-button>
                </div>
            </div>
        </form>
        <b-modal v-model="modalShow">Dekujeme za vyuzivani nasiho portalu !</b-modal>
    </div>
</template>

<script>
    import Upload from './components/Upload.vue'
    import Header from "./components/TheHeader"
    import Button from 'bootstrap-vue/es/components/button/button';
    import axios from 'axios'
    import {BModal} from 'bootstrap-vue/es/components'
    import {validateJson} from './rules/ValidationRule'
    import {defaultObject} from './statics/const'
    import {isFolderExist, createFolder, uploadFiles, login} from './owncloud/owncloudService'

    export default {
        data() {
            return {
                info: {
                    requestId: null,
                    timestamp: null,
                    fee: null,
                    folderName: null
                },
                forms: [],
                files: [],
                modalShow: false
            }
        },
        name: 'app',
        components: {
            Header,
            Upload,
            'b-button': Button,
            'b-modal': BModal
        },
        created() {
            this.login();
        },
        computed: {
            jsonContent() {
                return this.$store.state.jsonContent
            }
        },
        methods: {
            async login() {
                const res = await axios.get("http://localhost:3000/api/v1.0/owncloud/");
                this.$store.commit("changeInputJson", res.data[0]);
                this.$store.commit("changeInputJsonInfo", res.data[0].info);
                await login();
                this.parseJson(res.data[0]);
            },
            parseJson(json) {
                let formsArray = [];
                for (let i = 0; i < json.form.length; i++) {
                    let form = [];
                    let items = [];
                    for (let z = 0; z < json.form[i].items.length; z++) {
                        items.push(validateJson(json.form[i].items[z]));
                    }
                    form.groupName = json.form[i].groupName;
                    form.items = items;
                    formsArray.push(form);
                }
                this.forms = formsArray;
            },
            async uploadFile() {
                const fileUploadList = this.files;
                let folderName = "Documents/" + this.$store.getters.info.folderName + Date.now() + "/";
                if (await isFolderExist(this.$store.getters.info.folderName)) {
                    await createFolder(folderName);
                }
                if (fileUploadList !== undefined && fileUploadList !== null && fileUploadList.length > 0) {
                    await uploadFiles(folderName, fileUploadList);
                    this.modalShow = true;
                }
            },
            getFileFromChildComponent(value) {
                this.files.push(value);
            },
            addInput(itemLabel) {
                const defaultJson = Object.assign({}, defaultObject, {});
                for (let i = 0; i < this.forms.length; i++) {
                    for (let w = 0; w < this.forms[i].items.length; w++) {
                        if (this.forms[i].items[w].label === itemLabel) {
                            this.forms[i].push(this.forms[i].items.splice(++w, 0, defaultJson));
                        }
                    }
                }
            }
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
