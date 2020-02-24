<template>
    <MyLayout id="userList">
        <input v-model="search" class="form-control mr-sm-2" ref="my_input" type="search" placeholder="Search user"
               aria-label="Search">
        <b-card>
            <b-list-group id="list-user" v-if="userList">
                <b-list-group-item v-for="currentUser in filteredList"
                                   :key="currentUser.correlationId">
                    {{ currentUser.info[0].name }}
                    <div class="float-right">
                        <ActionButton :key="currentUser.correlationId"
                                      :currentUser="currentUser"
                                      :isHidden="true"/>
                    </div>
                </b-list-group-item>
            </b-list-group>
        </b-card>
    </MyLayout>
</template>

<script>
    import {BCard, BListGroup, BListGroupItem} from "bootstrap-vue/esm";
    import ActionButton from "../components/ActionButton";
    import Api from "../Api";

    export default {
        name: "UserList",
        data() {
            return {
                search: '',
                userList: null,
            }
        },
        components: {
            ActionButton,
            'b-list-group-item': BListGroupItem,
            'b-list-group': BListGroup,
            'b-card': BCard,
        },
        async mounted() {
            const resUserList = await Api.getAllUsers();
            this.userList = resUserList.data;
        },
        computed: {
            filteredList() {
                return this.userList.filter(user => {
                    return user.info[0].name.toLowerCase().includes(this.search.toLowerCase())
                })
            },
        }
    }
</script>