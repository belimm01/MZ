<template>
        <b-modal v-model="showModal">
            <div v-if="showSpinner" class="d-flex justify-content-center">
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
            <div v-if="showModalContent">Dekujeme za vyuzivani nasiho portalu !</div>
        </b-modal>
</template>

<script>
    import {BModal} from "bootstrap-vue/esm";

    export default {
        name: "MyModal",
        props: ['showModal', 'showSpinner', 'showModalContent'],
        components: {
            'b-modal': BModal
        },
    }
</script>