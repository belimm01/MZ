<template>
    <div>
        <!-- Image and text -->
        <b-navbar variant="faded" type="light">
            <b-navbar-brand href="#">
                <img alt="Logo" class="d-inline-block align-top" src="~@/assets/logo-mz.svg">
            </b-navbar-brand>
        </b-navbar>
    </div>
</template>

<script>
    import Navbar from 'bootstrap-vue/es/components/navbar/navbar';
    import NavbarBrand from 'bootstrap-vue/es/components/navbar/navbar-brand';

    export default {
        name: "Header",
        components: {
            'b-navbar': Navbar,
            'b-navbar-brand': NavbarBrand
        }
    }
</script>

<style scoped>
</style>