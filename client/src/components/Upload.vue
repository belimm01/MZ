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
                <div v-bind:style="{display: multiple}" >
                    <a href="javascript:void(0);"
                       :rel="rel"
                       v-on:click="addChildInput($event)">
                        pridat dalsi
                    </a>
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
            return {
                filesToUpload: [],
            }
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
            addValue() {
                let file = event.target.files[0];
                let fileArray = [];
                fileArray.fileName = file.name;
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
                this.filesToUpload.push(fileArray);
                this.$emit('getFileArray', fileArray);
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