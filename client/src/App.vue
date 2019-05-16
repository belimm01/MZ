<template>
    <div id="app">
        <Header/>
        <div class="container">
            <div class="row">
                <div class="col-sm">
                    <h1>Elektronická podatelna MZČR</h1>
                </div>
            </div>
            <br>
            <div class="row">
                <div class="col-sm">
                    <h3>Obecne soubory</h3>
                </div>
                <br>
            </div>
        </div>
        <Upload/>
    </div>
</template>

<script>
    import Upload from './components/Upload.vue'
    import Header from "./components/Header"

    export default {
        name: 'app',
        components: {
            Header,
            Upload
        },
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
