<template>
    <MyLayout id="userAccreditationInfo">
        <div>
            <b-card>
                <b-card alt="User avatar" :img-src="require('../assets/user-icon.svg')" img-right>
                    <b-card-text>
                        <h1 class="text-center">User information</h1>
                        <b-table stacked :items="userInfo.info"></b-table>
                    </b-card-text>
                    <ActionButton :isHidden="false"/>
                </b-card>
            </b-card>
        </div>
    </MyLayout>
</template>

<script>
    import {BTable, BCard, BCardText} from "bootstrap-vue/esm";
    import ActionButton from "../components/ActionButton";

    export default {
        name: "UserAccreditationInfo",
        props:['userInfo'],
        components: {
            ActionButton,
            'b-card': BCard,
            'b-card-text': BCardText,
            'b-table': BTable,
        },
        methods: {}
    }
</script>