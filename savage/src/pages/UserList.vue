<template>
    <MyLayout id="userList">
        <b-card>
            <b-list-group id="list-user"
                          :per-page="perPage"
                          :current-page="currentPage">
                <b-list-group-item v-for="currentUser in userList"
                                   v-bind:key="currentUser.correlationId">
                    {{ currentUser.info[0].name }}
                    <div class="float-right">
                        <ActionButton :key="currentUser.correlationId"
                                      :currentUser="currentUser"
                                      :isHidden="true"/>
                    </div>
                </b-list-group-item>
            </b-list-group>
        </b-card>
        <b-pagination
                v-model="currentPage"
                :total-rows="rows"
                :per-page="perPage"
                aria-controls="list-user"
                align="center"
        ></b-pagination>
    </MyLayout>
</template>

<script>
    import {BCard, BPagination, BListGroup, BListGroupItem} from "bootstrap-vue/esm";
    import ActionButton from "../components/ActionButton";
    import Api from "../Api";

    export default {
        name: "UserList",
        data() {
            return {
                userList: null,
                perPage: 5,
                currentPage: 1,
                rows: null
            }
        },
        components: {
            ActionButton,
            'b-list-group-item': BListGroupItem,
            'b-list-group': BListGroup,
            'b-card': BCard,
            'b-pagination': BPagination
        },
        async mounted() {
            const resUserList = await Api.getAllUsers();
            this.userList = resUserList.data;
            this.rows = resUserList.length
        },
    }
</script>