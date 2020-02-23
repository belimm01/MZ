<template>
    <div>
        <b-button-group>
            <b-button v-on:click="goHome" v-if="!isHidden" size="sm" variant="dark">
                Home
            </b-button>
            <div class="divider"></div>
            <b-button v-on:click="getUserInfo" v-if="isHidden" size="sm" variant="success">
                <BIconInfo></BIconInfo>
                Info
            </b-button>
            <div class="divider"></div>
            <b-button v-on:click="editUserInfo" v-if="isHidden" size="sm" variant="info">
                <BIconPencil></BIconPencil>
                Edit info
            </b-button>
            <div class="divider"></div>
            <b-button v-on:click="editUserState" v-if="isHidden" size="sm" variant="info">
                <BIconPencil></BIconPencil>
                Edit process
            </b-button>
            <div class="divider"></div>
            <b-button v-on:click="deleteUser" v-if="isHidden" size="sm" variant="danger">
                <BIconTrashFill></BIconTrashFill>
                Delete
            </b-button>
        </b-button-group>
    </div>
</template>

<script>

    import {BButton} from "bootstrap-vue/esm";
    import {BIconPencil, BIconTrashFill, BButtonGroup, BIconInfo} from "bootstrap-vue";
    import Api from "../Api";

    export default {
        name: "ActionButton",
        props: ['isHidden', 'currentUser'],
        components: {
            'b-button': BButton,
            'BIconPencil': BIconPencil,
            'BIconTrashFill': BIconTrashFill,
            'b-button-group': BButtonGroup,
            'BIconInfo': BIconInfo
        },
        methods: {
            editUserInfo() {
                this.$router.push({
                    name: 'userAccreditationInfoForm',
                    params: {
                        correlationId: this.currentUser.correlationId,
                        currentUser: this.currentUser
                    }
                })
            },
            async deleteUser() {
                await Api.deleteUser(this.currentUser.correlationId);
                if (this.$router.url === '/userList' || this.$router.url === undefined) {
                    this.$router.go();
                } else {
                    this.$router.push({
                        name: 'userList',
                    })
                }
            },
            getUserInfo() {
                this.$router.push({
                    name: 'userAccreditationInfo',
                    params: {
                        correlationId: this.currentUser.correlationId,
                        currentUser: this.currentUser
                    }
                })
            },
            editUserState() {
                this.$router.push({
                    name: 'userAccreditationProcessForm',
                    params: {
                        correlationId: this.currentUser.correlationId,
                        currentUser: this.currentUser
                    }
                })
            },
            goHome() {
                this.$router.push({
                    name: 'userList',
                })
            }
        }
    }
</script>

<style scoped>
    .divider {
        width: 5px;
        height: auto;
        display: inline-block;
    }
</style>