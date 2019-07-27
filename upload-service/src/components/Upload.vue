<template>
    <div>
        <div v-if="required===true">
            <div class="row">
                <div class="col-6 text-right required">
                    {{label}}
                </div>
                <div class="col-4">
                    <input value="value"
                           required
                           @change="parseFile"
                           type="file"
                           :accept="acceptFormats">
                    <div v-bind:style="{display: multiple}">
                        <a href="javascript:void(0);"
                           :rel="rel"
                           v-on:click="addChildInput($event)">
                            pridat dalsi
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="row">
                <div class="col-6 text-right">
                    {{label}}
                </div>
                <div class="col-4">
                    <input value="value"
                           @change="parseFile"
                           type="file"
                           :accept="acceptFormats">
                    <div v-bind:style="{display: multiple}">
                        <a href="javascript:void(0);"
                           :rel="rel"
                           v-on:click="addChildInput($event)">
                            pridat dalsi
                        </a>
                    </div>
                </div>
            </div>
        </div>
    <br>
    <br>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        props: {
            label: String,
            maxSize: Number,
            description: String,
            required: Boolean,
            acceptFormats: String,
            tags: Array,
            multiple: String,
            rel: String,
        },
        methods: {
            parseFile() {
                let file = event.target.files[0];
                let parseFile = [];
                parseFile.fileName = file.name;
                parseFile.required = this.required;
                if (file) {
                    let reader = new FileReader();
                    reader.readAsText(file, "UTF-8");
                    reader.onload = (evt) => {
                        parseFile.fileContent = evt.target.result;
                    };
                    reader.onerror = (evt) => {
                        console.log('error ', evt);
                    };
                }
                this.$emit('getFileContent', parseFile);
            },
            addChildInput(event) {
                event.target.style.display = "none";
                this.$emit('isInput', event.target.rel);
            }
        }
    }
</script>
<style>
    .required:before {
        content: "*";
        color: red;
    }
</style>