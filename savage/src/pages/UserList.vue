<template>
    <MyLayout id="userList">
        <input v-model="search" class="form-control mr-sm-2" ref="my_input" type="search" placeholder="Search user"
               aria-label="Search">
        <div v-if="userList">
            <b-card>
                <b-list-group id="list-user" :per-page="perPage" :current-page="currentPage">
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
            <b-pagination
                    v-model="currentPage"
                    :total-rows="rows"
                    :per-page="perPage"
                    aria-controls="list-user"
                    align="center"
            ></b-pagination>
        </div>
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
                search: '',
                userList: null,
                perPage: 10,
                currentPage: 1,
            }
        },
        components: {
            ActionButton,
            'b-list-group-item': BListGroupItem,
            'b-list-group': BListGroup,
            'b-card': BCard,
            'b-pagination': BPagination,
        },
        async mounted() {
            const resUserList = await Api.getAllUsers();
            this.userList = resUserList.data;
        },
        computed: {
            filteredList() {
                return this.userList.filter(user => {
                    return user.info[0].name.toLowerCase().includes(this.search.toLowerCase())
                }).filter((el, index) => {
                    return (index >= (this.currentPage - 1) * this.perPage && index < this.currentPage * this.perPage)
                })
            },
            rows() {
                if (this.filteredList.length < this.perPage) {
                    return this.filteredList.length
                } else {
                    return this.userList.length
                }
            }

        },
    }
</script>