<template>
    <div>
        <form @submit.prevent="uploadFileToOwncloud">
            <b-card>
                <b-card>
                    <UploadForm label="Editional files"
                                :multiple="true"
                                :required="false"
                                @getFileContent="getFileFromChildComponent"
                    />
                </b-card>
                <div v-for="form in forms" :key="form.id">
                    <b-card>
                        <br>
                        <div class="row">
                            <div class="col-sm">
                                <h3 class="text-center">{{form.groupName}}</h3>
                            </div>
                        </div>
                        <div v-for="item in form.items" :key="item.id">
                            <UploadForm :key="item.id"
                                        :label="item.label"
                                        :required="item.required"
                                        :multiple="false"
                                        :acceptFormats="item.acceptFormats"
                                        @getFileContent="getFileFromChildComponent"
                            />
                        </div>
                    </b-card>
                </div>
                <br>
                <div class="row">
                    <div class="col-sm">
                        <b-button type="submit" variant="info">Save</b-button>
                    </div>
                </div>
            </b-card>
        </form>
        <MyModal :showModal="showModal"
                 :showSpinner="showSpinner"
                 :showModalContent="showModalContent"/>
    </div>
</template>

<script>
    import {BCard, BButton} from "bootstrap-vue/esm";
    import UploadForm from "./UploadForm";
    import {createFolder, isFolderNotExist, uploadFiles} from "../services/owncloudService";
    import MyModal from "./MyModal";
    import Api from "../Api";
    import {updateUserAccreditationWithUploadState} from "../services/userAccreditationService";

    export default {
        name: "UploadFormsList",
        props: ['forms'],
        data() {
            return {
                showModalContent: false,
                showModal: false,
                showSpinner: false,
                files: [],
            }
        },
        components: {
            'b-card': BCard,
            'UploadForm': UploadForm,
            'b-button': BButton,
            'MyModal': MyModal
        },
        methods: {
            async uploadFileToOwncloud() {
                this.showModal = true;
                this.showSpinner = true;
                const fileUploadList = this.files;
                let folderName = "Documents/" + this.$store.getters.info[0].folderName + Date.now() + "/";
                if (await isFolderNotExist(this.$store.getters.info[0].folderName)) {
                    await createFolder(folderName);
                }
                if (fileUploadList !== undefined && fileUploadList !== null && fileUploadList.length > 0) {
                    await uploadFiles(folderName, fileUploadList);
                    this.$store.commit("changeInputJson", updateUserAccreditationWithUploadState(this.$store.getters.jsonContent, fileUploadList));
                    console.log(this.$store.getters.jsonContent);
                    await Api.updateUserAccreditationState(this.$store.getters.correlationId, this.$store.getters.jsonContent);
                    this.showSpinner = false;
                    this.showModalContent = true;
                }
            },
            getFileFromChildComponent(value) {
                for (let i = 0; i < value.length; i++) {
                    this.files.push(value[i]);
                }
            },
        }
    }
</script>