<template>
    <div>
        <b-button-group>
            <b-button v-on:click="goBack" v-if="!isHidden" size="sm" variant="dark">
                Back
            </b-button>
            <div class="divider"></div>
            <b-button v-on:click="getUserInfo" v-if="isHidden" size="sm" variant="success">
                <BIconInfo></BIconInfo>
            </b-button>
            <div class="divider"></div>
            <b-button v-on:click="editUserInfo" v-if="isHidden" size="sm" variant="info">
                <BIconPencil></BIconPencil>
            </b-button>
            <div class="divider"></div>
            <b-button v-on:click="deleteUser" v-if="isHidden" size="sm" variant="danger">
                <BIconTrashFill></BIconTrashFill>
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
                if (this.$router.url === '/userList') {
                    this.$router.go()
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
            goBack() {
                window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
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