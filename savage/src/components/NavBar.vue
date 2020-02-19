<template>
    <div>
        <nav class="navbar color-navbar justify-content-between">
            <form class="form-inline">
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn my-2 my-sm-0 color-button" type="submit">Search</button>
            </form>
        </nav>
    </div>
</template>

<script>

    export default {
        name: "NavBar",
        data() {
            return {}
        },
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