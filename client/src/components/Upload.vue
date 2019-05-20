<template>
    <div>
        <div class="row">
            <div class="col-6 text-right" aria-required="required">
                {{label}}
            </div>
            <div class="col-4">
                <input value="value"
                       @change="addValue"
                       :required="required"
                       type="file"
                       :accept="acceptFormats">
            </div>
            <div>

            </div>
            <div class="col-4">
            </div>
        </div>
        <br>
        <br>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                filesToUpload: []
            }
        },
        props: {
            label: String,
            maxSize: Number,
            description: String,
            required: Boolean,
            acceptFormats: String,
            tags: Array,
            multiple: Boolean,
        },
        methods: {
            addValue() {
                let file = event.target.files[0];
                let fileArray = [];
                fileArray.fileName  = file.name;
                if (file) {
                    let reader = new FileReader();
                    reader.readAsText(file, "UTF-8");
                    reader.onload = (evt) => {
                        fileArray.fileContent = evt.target.result;
                    };
                    reader.onerror = (evt) => {
                        console.log('error ', evt);
                    };
                }
                this.filesToUpload.push(fileArray)
                this.$emit('getFileArray', fileArray);
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