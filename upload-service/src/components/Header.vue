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
    import BNavbar from 'bootstrap-vue/es/components/navbar/navbar';
    import BNavbarBrand from 'bootstrap-vue/es/components/navbar/navbar-brand';

    export default {
        name: "Header",
        components: {
            'b-navbar': BNavbar,
            'b-navbar-brand': BNavbarBrand
        }
    }
</script>

<style scoped>
</style>