<template>
    <div>
        <div>
            <img alt="Logo" class="d-inline-block align-top" src="~@/assets/logo-mz.svg">
        </div>
        <nav class="navbar color-navbar justify-content-between">
            <form class="form-inline">
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn my-2 my-sm-0 color-button" type="submit">Search</button>
            </form>
        </nav>
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

    .color-button {
        background-color: rgb(127, 255, 212);
    }
</style>