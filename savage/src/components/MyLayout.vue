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
                <form class="form-inline">
                    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                    <b-button type="submit">Search</b-button>
                </form>
            </b-navbar-nav>
        </b-navbar>
        <div>
            <slot/>
        </div>
    </div>

</template>

<script>
    import {BButton, BNavbar, BNavbarBrand, BNavbarNav} from "bootstrap-vue/esm";

    export default {
        components: {
            'b-navbar-nav': BNavbarNav,
            'b-button': BButton,
            'b-navbar': BNavbar,
            'b-navbar-brand': BNavbarBrand
        }
    }
</script>