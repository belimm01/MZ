<template>
    <MyLayout id="userAccreditationInfo">
        <div>UserList</div>
        <b-card>
            <ul id="list-user" class="list-group">
                <li v-on:click="getUserInfo(user.correlationId)" class="list-group-item list-group-item-action"
                    v-for="user in userList"
                    v-bind:key="user.correlationId">
                    {{ user.info[0].name }}
                    <div class="float-right">
                        <ActionButton :isHidden="isHidden"/>
                    </div>
                </li>
            </ul>
        </b-card>
    </MyLayout>
</template>

<script>
    import axios from 'axios'
    import {BCard} from "bootstrap-vue/esm";
    import ActionButton from "../components/ActionButton";

    export default {
        name: "UserList",
        data() {
            return {
                userList: null,
                isHidden: {
                    isHiddenUserInfo: true,
                    isHiddenBackButton: true,
                    isHiddenUserList: false,
                }
            }
        },
        components: {
            ActionButton,
            'b-card': BCard,
        },
        async mounted() {
            const res = await axios.get('http://localhost:3000/userAccreditationList');
            this.userList = res.data;
        },
        methods: {
            getUserInfo(userCorrelationId) {
                this.$router.push({
                    name: 'userAccreditationInfo',
                    params: {
                        correlationId: userCorrelationId,
                        isHidden: this.isHidden
                    }
                })
            },
        }
    }
</script>