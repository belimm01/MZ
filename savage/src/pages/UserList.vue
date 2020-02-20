<template>
    <MyLayout id="userList">
        <b-card>
            <ul id="list-user" class="list-group">
                <li v-on:click="getUserInfo(user.correlationId)" class="list-group-item list-group-item-action"
                    v-for="user in userList"
                    v-bind:key="user.correlationId">
                    {{ user.info[0].name }}
                    <div class="float-right">
                        <ActionButton :isHidden="true"/>
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
            }
        },
        components: {
            ActionButton,
            'b-card': BCard,
        },
        async mounted() {
            const resUserList = await axios.get('http://localhost:3000/userAccreditationList');
            this.userList = resUserList.data;
        },
        methods: {
            async getUserInfo(userCorrelationId) {
                const userInfo = (await axios.get('http://localhost:3000/userAccreditation/id/' + userCorrelationId));
                await this.$router.push({
                    name: 'userAccreditationInfo',
                    params: {
                        correlationId: userCorrelationId,
                        userInfo: userInfo.data[0]
                    }
                })
            },
        }
    }
</script>