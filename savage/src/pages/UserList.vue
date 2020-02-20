<template>
    <MyLayout id="userList">
        <b-card>
            <ul id="list-user" class="list-group">
                <li class="list-group-item"
                    v-for="currentUser in userList"
                    v-bind:key="currentUser.correlationId">
                    {{ currentUser.info[0].name }}
                    <div class="float-right">
                        <ActionButton :currentUser="currentUser" :isHidden="true"/>
                    </div>
                </li>
            </ul>
        </b-card>
    </MyLayout>
</template>

<script>
    import {BCard} from "bootstrap-vue/esm";
    import ActionButton from "../components/ActionButton";
    import Api from "../Api";

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
            const resUserList = await Api.getAllUsers();
            this.userList = resUserList.data;
        },
    }
</script>