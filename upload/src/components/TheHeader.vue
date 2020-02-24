<template>
    <div class="clearfix">
        <b-img alt="Logo" src="../assets/logo-mz.svg"></b-img>
    </div>
</template>

<script>
    import {BImg} from "bootstrap-vue/esm";

    export default {
        name: "Header",
        components: {
            'b-img' : BImg,
        }
    }
</script>