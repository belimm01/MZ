<template>
    <MyLayout id="userAccreditationInfo">
        <div>
            <b-card>
                <b-card alt="User avatar" :img-src="require('../assets/user-icon.svg')" img-right>
                    <b-card-text>
                        <h1 class="text-center">User information</h1>
                    </b-card-text>
                    <b-form @submit="onSubmit" v-if="true">
                        <b-container fluid>
                            <div v-for="(value, name) in currentUser.state" :value="value" :key="name">
                                <b-row class="my-1">
                                    <b-col sm="2">
                                        <label><b>{{name}}:</b></label>
                                    </b-col>
                                    <b-col sm="6">
                                        <b-form-group id="input-group-user-info">
                                            <b-form-input
                                                    @input="update(name,$event)"
                                                    :value="value"
                                                    :key="name"
                                            ></b-form-input>
                                        </b-form-group>
                                    </b-col>
                                </b-row>
                            </div>
                            <b-row class="my-1">
                                <b-col sm="6">
                                </b-col>
                                <b-col sm="4">
                                    <b-button type="submit" variant="primary">Submit</b-button>
                                </b-col>
                            </b-row>
                        </b-container>
                    </b-form>
                    <ActionButton :isHidden="false"/>
                </b-card>
            </b-card>
        </div>
    </MyLayout>
</template>

<script>
    import {BCard, BCol, BRow, BButton, BCardText, BContainer, BFormInput, BFormGroup, BForm} from "bootstrap-vue/esm";
    import ActionButton from "../components/ActionButton";
    import Api from '../Api'

    export default {
        name: "UserAccreditationInfoForm",
        props: ['currentUser'],
        components: {
            ActionButton,
            'b-card': BCard,
            'b-card-text': BCardText,
            'b-form-group': BFormGroup,
            'b-form': BForm,
            'b-form-input': BFormInput,
            'b-container': BContainer,
            'b-col': BCol,
            'b-row': BRow,
            'b-button': BButton
        },
        methods: {
            async onSubmit(evt) {
                evt.preventDefault();
                await Api.updateUserInfo(this.currentUser);
                this.$router.push({
                    name: 'userAccreditationInfo',
                    params: {
                        correlationId: this.currentUser.correlationId,
                        currentUser: this.currentUser
                    }
                })
            },
            update(key, value) {
                this.currentUser.state[0][key] = value;
            },
        }
    }
</script>