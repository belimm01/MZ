<template>
    <div>
        <div class="row">
            <div v-bind:class="{'col-6 text-right' : true, 'required':required}">
                {{label}}
            </div>
            <div class="col-4">
                <input value="value"
                       :required="required"
                       @change="parseFile"
                       type="file"
                       :accept="acceptFormats">

            </div>
        </div>
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
        }
    }
</script>
<style>
    .required:before {
        content: "*";
        color: red;
    }
</style>