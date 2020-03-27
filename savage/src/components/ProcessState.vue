<template>
    <div>
        <b-button v-b-toggle.collapse-1 variant="primary">Show process</b-button>
        <b-collapse id="collapse-1" class="mt-2">
            <b-card v-for="(stateValue, stateName) in  currentUser.state" :value="stateValue" :key="stateName">
                <p class="d-flex justify-content-between align-items-center card-text h4 mb-2">
                    {{stateName}}
                    <BIconCheckBox class="rounded" v-if="stateValue" variant="success" right></BIconCheckBox>
                    <BIconXCircle class="rounded" v-if="!stateValue" variant="danger" style></BIconXCircle>
                </p>
                <div v-if="stateName==='upload' && stateValue">
                    <b-button v-b-toggle="'accordion-' + stateName" size="sm" variant="info">Show details</b-button>
                    <b-collapse :id="'accordion-'+ stateName" class="mt-2">
                        <b-card>
                            <b-card-text>
                                <p><b>Uploaded date:</b></p>
                                <p>{{formattedDate(currentUser.upload.uploadedDate)}}</p>
                                <p><b>Uploaded file:</b></p>
                                <p v-for="uploadFile in currentUser.upload.uploadedFiles"
                                   :key="uploadFile">
                                    {{uploadFile}}
                                </p>
                            </b-card-text>
                        </b-card>
                    </b-collapse>
                </div>
            </b-card>
        </b-collapse>
    </div>
</template>

<script>
    import {BButton, BCard, BCollapse, VBToggle, BCardText} from "bootstrap-vue/esm";
    import {BIconCheckBox, BIconXCircle} from "bootstrap-vue";

    export default {
        stateName: "ProcessState",
        props: ['isHidden', 'currentUser'],
        components: {
            'b-button': BButton,
            'b-collapse': BCollapse,
            'b-card': BCard,
            'BIconCheckBox': BIconCheckBox,
            'BIconXCircle': BIconXCircle,
            'b-card-text': BCardText
        },
        directives: {
            'b-toggle': VBToggle,
        },
        methods: {
            formattedDate(timestamp) {
                console.log(timestamp)
                console.log(new Date(timestamp))
                return new Date(timestamp);
            }
        }
    }
</script>