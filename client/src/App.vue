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
                    <h3 v-for="form in forms">{{form.groupName}}</h3>
                </div>
                <br>
            </div>
        </div>
        <Upload
                v-for="item in forms.items"
                :label="item.label"
                :maxSize="item.maxSize"
                :description="item.description"
                :required="item.required"
                :acceptFormats="item.acceptFormats"
                :tags="item.tags"
                :multiple="item.multiple"
        />
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
                info: {
                    requestId: null,
                    timestamp: null,
                    fee: null,
                    folderName: null
                },
                forms: [{
                    groupName: null,
                    items: [{
                        label: null,
                        maxSize: null,
                        description: null,
                        required: false,
                        acceptFormats: null,
                        tags: null,
                        multiple: false,
                    }]
                }]
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
                this.$store.commit("changeInputJson", res.data[0]);
                this.$store.commit("changeInputJsonInfo", res.data[0].info);
                await oc.login('admin', 'admin');
                this.parseJson(res.data[0]);
            },
            parseJson(json) {
                for (let i = 0; i < json.form.length; i++) {
                    this.forms[i].groupName = json.form[i].groupName;
                    for (let z = 0; z < json.form[i].items.length; i++) {
                        let items = {
                            label: json.form[i].items[z].label,
                            maxSize: json.form[i].items[z].maxSize,
                            description: json.form[i].items[z].description,
                            required: json.form[i].items[z].required,
                            acceptFormats: json.form[i].items[z].acceptFormats,
                            tags: json.form[i].items[z].tags,
                            multiple: json.form[i].items[z].multiple,
                        };

                        this.items.push(items);
                        this.forms.push(this.items);
                    }
                }
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
