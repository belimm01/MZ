<template>
    <div>
        <div class="row">
            <div class="col-6 text-right" :aria-required="required">
              {{label}}
            </div>
            <div class="col-4">
                <b-form-file v-model="form.file" plain
                             class=""
                             id="fileUploadControl"
                             name="fileUploadControl"
                             @change="setFilePath"
                             :required="required"
                             type="file"
                             :accept="acceptFormats">
                </b-form-file>
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
    import BFormFile from 'bootstrap-vue/es/components/form-file/form-file'
    import BForm from 'bootstrap-vue/es/components/form/form'

    export default {
        data() {
            return {
                form: {
                    file: null,
                },
            }
        },
        props: {
            label: String,
            maxSize: Number,
            description: String,
            required: Boolean,
            acceptFormats: Array,
            tags: Array,
            multiple: Boolean,
        },
        components: {
            'b-form-file': BFormFile,
            'b-form': BForm
        },
        methods: {
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
        }
    }
</script>

<style>
    .required:before {
        content: "*";
        color: red;
    }
</style>