<template>
    <div>
        <b-button-group>
            <b-button v-on:click="goBack" v-if="!isHidden.isHiddenBackButton" size="sm" variant="dark">
                Back
            </b-button>
            <div class="divider"></div>
            <b-button size="sm" variant="info">
                <BIconPencil></BIconPencil>
            </b-button>
            <div class="divider"></div>
            <b-button size="sm" variant="danger">
                <BIconTrashFill></BIconTrashFill>
            </b-button>
        </b-button-group>
    </div>
</template>

<script>

    import {BButton} from "bootstrap-vue/esm";
    import {BIconPencil, BIconTrashFill, BButtonGroup} from "bootstrap-vue";

    export default {
        name: "ActionButton",
        props: ['isHidden'],
        mounted() {
            console.log('The props are also available in JS:', this.isHidden);
        },
        components: {
            'b-button': BButton,
            'BIconPencil': BIconPencil,
            'BIconTrashFill': BIconTrashFill,
            'b-button-group': BButtonGroup,
        },
        methods: {
            goBack() {
                window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
            }
        }
    }
</script>

<style scoped>
    .divider {
        width: 5px;
        height: auto;
        display: inline-block;
    }
</style>