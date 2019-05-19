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
            <div class="row">
                <div class="col-sm">
                    <h3>{{groupName}}</h3>
                </div>
                <br>
            </div>
        </div>
        <Upload
                :label="label"
                :maxSize="maxSize"
                :description="description"
                :required="required"
                :acceptFormats="acceptFormats"
                :tags="tags"
                :multiple="multiple"
                :info="info"/>
        <div class="row">
            <div class="col-sm">
                <b-button type="submit" variant="primary" @click="uploadFile">Save</b-button>
            </div>
        </div>
    </div>
</template>

<script>
    import Upload from './components/Upload.vue'
    import Header from "./components/Header"
    import Button from 'bootstrap-vue/es/components/button/button';
    import axios from 'axios'
    import owncloud from 'js-owncloud-client';

    const oc = new owncloud('http://localhost/');

    export default {
        data() {
            return {
                groupName: null,
                label: null,
                maxSize: null,
                description: null,
                required: false,
                acceptFormats: null,
                tags: null,
                multiple: false,
                info: null,
            }
        },
        name: 'app',
        components: {
            Header,
            Upload,
            'b-button': Button,
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
                this.$store.commit("changeInputJsonContent", res.data[0]);
                await oc.login('admin', 'admin')
                this.parseJson();
            },
            parseJson() {
                this.groupName = this.jsonContent.form[0].groupName;
                this.label = this.jsonContent.form[0].items[0].label;
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
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
