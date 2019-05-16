<template>
    <div>
        <!--        <b-form v-if="show">-->
        <div class="row">
            <div class="col-6 text-right required">
                Žádost o akreditaci:
            </div>
            <div class="col-4">
                <b-form-file v-model="form.file" plain
                             class=""
                             id="fileUploadControl"
                             name="fileUploadControl"
                             @change="setFilePath"
                             required
                             type="file"
                             accept=".doc,.pdf,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document">
                </b-form-file>
            </div>
            <div class="col-4">
            </div>
        </div>
        <br>
        <br>
        <div class="row">
            <div class="col-sm">
                <b-button type="submit" variant="primary" @click="uploadFile">Save</b-button>
            </div>
        </div>
        <!--        </b-form>-->
    </div>
</template>

<script>
    import owncloud from 'js-owncloud-client';
    import Button from 'bootstrap-vue/es/components/button/button';
    import BFormFile from 'bootstrap-vue/es/components/form-file/form-file'
    import BForm from 'bootstrap-vue/es/components/form/form'
    import axios from 'axios'

    const oc = new owncloud('http://localhost/');

    export default {
        data() {
            return {
                form: {
                    file: null,
                },
                show: true
            }
        },
        props: {
            fileName: String,
            acceptFormats: String,
            files: Array,
            shortDescription: String,
            longDescription: String,
            size: Number,
            required: Boolean
        },
        components: {
            'b-button': Button,
            'b-form-file': BFormFile,
            'b-form': BForm
        },
        mounted: async () => {
            await axios.get("http://localhost:3000/api/v1.0/owncloud/").then(res => {
                console.log(res);
                this.$store.commit("changeInputJsonContent", res);
            });
            this.login();
        },
        methods: {
            login() {
                oc.login('admin', 'admin').then(status => {
                    console.log('ok', status)
                })
            },
            setFilePath() {
                let file = document.getElementById("fileUploadControl").files[0];
                this.$store.commit("changeFileName", document.getElementById("fileUploadControl").files[0].name);
                let fileContent;
                if (file) {
                    let reader = new FileReader();
                    reader.readAsText(file, "UTF-8");
                    reader.onload = (evt) => {
                        fileContent = evt.target.result;
                    };
                    reader.onerror = (evt) => {
                        console.log('error ', evt);
                    };
                }
                this.$store.commit('changeFileContent', fileContent);
            },

            uploadFile() {
                let fileName = this.$store.getters.fileName;
                let content = this.$store.getters.fileContent;
                oc.files.putFileContents('Data/' + fileName, content).then(files => {
                    console.log(files);
                }).catch(error => {
                    console.log(error);
                });
            },
        }
    }
</script>

<style>
    .required:before {
        content: "*";
        color: red;
    }
</style>