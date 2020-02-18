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
                <form @submit.prevent="uploadFile">
                    <div v-for="form in forms">
                        <br>
                        <div class="row">
                            <div class="col-sm">
                                <h3>{{form.groupName}}</h3>
                            </div>
                        </div>
                        <div v-for="(item,index) in form.items">
                            <div v-for="(upload) in item.uploads">
                                <Upload v-bind:key="upload"
                                        :rel="item.label"
                                        :multiple="item.multiple"
                                        :label="item.label"
                                        :maxSize="item.maxSize"
                                        :description="item.description"
                                        :required="item.required"
                                        :acceptFormats="item.acceptFormats"
                                        :tags="item.tags"
                                        @getFileContent="getFileFromChildComponent"
                                />
                            </div>
                            <div class="text-right" v-bind:style="{display: multiple}">
                                <a href="javascript:void(0);"
                                   v-on:click="addChildInput(index)">
                                    pridat dalsi
                                </a>
                            </div>
                        </div>
                    </div>
                    <br>
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
    import Modal from 'bootstrap-vue/es/components/modal/modal'
    import {validateJson} from './rules/ValidationRule'
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
            'b-modal': Modal
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
                const url = new URL(location.href);
                const token = url.searchParams.get("token");
                const email = url.searchParams.get("email");
                if ((token !== "undefined" && email !== "undefined") && (token !== null && email !== null)) {
                    if (token.length > 0 && email.length > 0) {
                        const res = await axios.get("http://localhost:3000/accreditation/?email=" + email + "&token=" + token);
                        this.isIncorrectAPI = false;
                        this.$store.commit("changeInputJson", res.data);
                        this.$store.commit("changeInputJsonInfo", res.data.info);
                        await login();
                        this.parseJson(res.data[0]);
                    } else {
                        console.log("incorrect url, please provide url with example: http://localhost:3000/accreditation/?token=blabalbala");
                    }
                } else {
                    console.log("incorrect url, please provide url with example: http://localhost:3000/accreditation/?token=blabalbala");
                }
            },

            parseJson(data) {
                let formsArray = [];
                for (let i = 0; i < data.form.length; i++) {
                    let form = [];
                    let items = [];
                    for (let z = 0; z < data.form[i].items.length; z++) {
                        const item =validateJson(data.form[i].items[z]);
                        item.uploads=[];
                        item.uploads.push({});
                        items.push(item);
                    }
                    form.groupName = data.form[i].groupName;
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

            addChildInput(index){
                for (let i = 0; i < this.forms.length; i++) {
                    this.forms[i].items[index].uploads.push({});
                }
                this.$forceUpdate();
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
