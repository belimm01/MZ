<template>
    <div id="app">
        <Header/>
        <div class="container">
            <div v-if="!isIncorrectAPI">
                <div class="row">
                    <div class="col-sm">
                        <h1>Elektronická podatelna MZČR</h1>
                    </div>
                </div>
                <br>
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
            </div>
            <div v-else>
                <div class="d-flex justify-content-center align-items-center" style="height:100px;">
                    <h1>400 Bad Request</h1>
                </div>
            </div>
        </div>
        <div class="modal-dialog-centered">
            <b-modal v-model="showModal">
                <div v-if="showSpinner" class="d-flex justify-content-center">
                    <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
                <div v-if="showModalContent">Dekujeme za vyuzivani nasiho portalu !</div>
            </b-modal>
        </div>
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
    import {isFolderNotExist, createFolder, uploadFiles, login} from './owncloud/owncloudService'

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
                showModalContent: false,
                showModal: false,
                showSpinner: false,
                isIncorrectAPI: true
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
                let url = new URL(location.href);
                let email = url.searchParams.get("email");
                if (email.length > 0) {
                    let res = await axios.get("http://localhost:3000/accreditation/?email=" + email);
                    this.isIncorrectAPI = false;
                    this.$store.commit("changeInputJson", res.data);
                    this.$store.commit("changeInputJsonInfo", res.data.info);
                    await login();
                    this.parseJson(res.data);
                }
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
                this.showModal = true;
                this.showSpinner = true;

                const fileUploadList = this.files;
                let folderName = "Documents/" + this.$store.getters.info.folderName + Date.now() + "/";
                if (await isFolderNotExist(this.$store.getters.info.folderName)) {
                    await createFolder(folderName);
                }
                if (fileUploadList !== undefined && fileUploadList !== null && fileUploadList.length > 0) {
                    await uploadFiles(folderName, fileUploadList);
                    this.showSpinner = false;
                    this.showModalContent = true;
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
    .modal-center {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
