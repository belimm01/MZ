<template>
    <div id="app">
        <Header/>
        <div class="container">
            <div class="row">
                <div class="col-sm">
                    <h1>Platebni brana MZČR</h1>
                </div>
            </div>
            <br>
        </div>
    </div>
</template>

<script>
    import Upload from './components/Upload.vue'
    import Header from "./components/Header"
    import Button from 'bootstrap-vue/es/components/button/button';
    import {BModal} from 'bootstrap-vue/es/components'

    export default {
        data() {
            return {}
        },
        name: 'app',
        components: {
            Header,
            Upload,
            'b-button': Button,
            'b-modal': BModal
        },
        computed: {

        },
        methods: {

        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
