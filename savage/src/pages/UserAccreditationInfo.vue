<template>
    <div>
        <b-card>
            <b-card alt="User avatar" :img-src="require('../assets/user-icon.svg')" img-right>
                <b-card-text>
                    <h1 class="text-center">User information</h1>
                    <b-table stacked :items="userInfo[0].info"></b-table>
                </b-card-text>
                <ActionButton :isHidden="isHidden"/>
            </b-card>
        </b-card>
    </div>
</template>

<script>
    import {BTable, BCard, BCardText} from "bootstrap-vue/esm";
    import ActionButton from "../components/ActionButton";
    import axios from "axios";

    export default {
        name: "UserAccreditationInfo",
        data() {
            return {
                userAccreditationInfo: null
            }
        },
        mounted: async function () {
            this.isHidden.isHiddenBackButton = false;
            this.userAccreditationInfo = (await axios.get('http://localhost:3000/userAccreditation/id/' + this.$router.params.correlationId)).data;

            console.log('The props are also available in JS:', this.userInfo[0].info[0], this.isHidden);
        },
        props: ['userInfo', 'isHidden'],
        components: {
            ActionButton,
            'b-card': BCard,
            'b-card-text': BCardText,
            'b-table': BTable,
        },
        methods: {}
    }
</script>