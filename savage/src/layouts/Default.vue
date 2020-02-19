<template>
    <div id="app">
            <Header/>
            <br>
            <br>
            <br>
            <NavBar></NavBar>
    </div>
</template>


<script>
    import Header from "../components/TheHeader";
    import NavBar from "../components/NavBar";

    export default {
        components: {
            Header,
            NavBar,
        },
    }
</script>