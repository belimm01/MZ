<template>
    <div>
        <div>
            <img alt="Logo-MZ" class="d-inline-block align-top" src="~@/assets/logo-mz.svg">
        </div>
        <br>
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand href="http://localhost/index.php/login">
                <img alt="Logo-Owncloud" class="d-inline-block align-top" src="~@/assets/logo-owncloud.svg">
            </b-navbar-brand>
            <b-navbar-nav class="ml-auto">
                <h4>Visualization board</h4>
            </b-navbar-nav>
        </b-navbar>
        <div>
            <slot/>
        </div>
    </div>

</template>

<script>
    import {BNavbar, BNavbarBrand, BNavbarNav} from "bootstrap-vue/esm";

    export default {
        components: {
            'b-navbar': BNavbar,
            'b-navbar-brand': BNavbarBrand,
            'b-navbar-nav': BNavbarNav
        },
    }
</script>