<template>
    <div>
        <div class="row">
            <div v-bind:class="{'col-6 text-right' : true, 'required':required}">
                {{label}}
            </div>
            <div class="col-4">
                <input value="value"
                       :required="required"
                       :multiple="multiple"
                       type="file"
                       name="files[]"
                       @change="parseFile"
                       :accept="acceptFormats">

            </div>
        </div>
        <br>
    </div>
</template>

<script>
    export default {
        name: "UploadForm",
        props: {
            label: String,
            required: Boolean,
            acceptFormats: String,
            multiple: Boolean
        },
        methods: {
            parseFile() {
                let parseFiles = [];
                let files = event.target.files;
                for (let i = 0; i < files.length; i++) {
                    let file = [];
                    file.fileName = files[i].name;
                    file.required = this.required;
                    if (file) {
                        let reader = new FileReader();
                        reader.readAsText(files[i], "UTF-8");
                        reader.onload = (evt) => {
                            file.fileContent = evt.target.result;
                        };
                        reader.onerror = (evt) => {
                            console.log('error ', evt);
                        };
                    }
                    parseFiles.push(file);
                }
                this.$emit('getFileContent', parseFiles);
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