<template>
    <div>
        <nav class="navbar color-navbar justify-content-between">
            <form class="form-inline">
                <img alt="Logo" class="d-inline-block align-top" src="~@/assets/logo-mz.svg">
            </form>
        </nav>
        <br>
        <div>
            <slot />
        </div>
    </div>
    
</template>

<script>
    export default {
    }
</script>

<style scoped>
    .color-navbar {
        background-color: rgb(0, 139, 139);
    }
</style>