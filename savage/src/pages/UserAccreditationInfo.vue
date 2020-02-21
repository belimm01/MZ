<template>
    <MyLayout id="userAccreditationInfo">
        <div>
            <b-card>
                <b-card alt="User avatar" :img-src="require('../assets/user-icon.svg')" img-right>
                    <ActionButton :currentUser="currentUser" :isHidden="false"/>
                    <b-card-text>
                        <h1 class="text-center">User information</h1>
                        <b-table stacked :items="currentUser.info"></b-table>
                    </b-card-text>
                    <ProcessState :currentUser="currentUser"></ProcessState>
                </b-card>
            </b-card>
        </div>
    </MyLayout>
</template>

<script>
    import {BTable, BCard, BCardText} from "bootstrap-vue/esm";
    import ActionButton from "../components/ActionButton";
    import ProcessState from "../components/ProcessState";

    export default {
        name: "UserAccreditationInfo",
        props:['currentUser'],
        components: {
            ProcessState,
            ActionButton,
            'b-card': BCard,
            'b-card-text': BCardText,
            'b-table': BTable,
        }
    }
</script>