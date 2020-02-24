<template>
    <div id="app">
        <MyLayout>
            <div class="container">
                <div v-if="!isIncorrectAPI">
                    <div class="row">
                        <div class="col-sm">
                            <h1 class="text-center">Elektronická podatelna MZČR</h1>
                        </div>
                    </div>
                    <UploadFormsList :forms="forms"/>
                </div>
                <div v-else>
                    <div class="d-flex justify-content-center align-items-center" style="height:100px;">
                        <h1>400 Bad Request</h1>
                    </div>
                </div>
            </div>
        </MyLayout>
    </div>
</template>


<script>
    import MyLayout from "./components/MyLayout"
    import Api from "./Api";
    import {checkUrl} from "./services/urlService";
    import {login} from "./services/owncloudService";
    import {parseJson} from "./services/validateUserAccreditation";
    import UploadFormsList from "./components/UploadFormsList";

    export default {
        data() {
            return {
                info: {},
                forms: [],
                isIncorrectAPI: true,
            }
        },
        name: 'app',
        components: {
            'UploadFormsList': UploadFormsList,
            'MyLayout': MyLayout,
        },
        created() {
            this.login();
        },
        computed: {
            jsonContent() {
                return this.$store.state.jsonContent
            }
        },
        methods: {
            async login() {
                const url = new URL(location.href);
                const self = this;
                if (await checkUrl(self, url)) {
                    const res = await Api.getUserInfoByCorrelationIdAndToken(self.$store.getters.correlationId, self.$store.getters.token);
                    self.isIncorrectAPI = false;
                    self.$store.commit("changeInputJson", res.data);
                    self.$store.commit("changeInputJsonInfo", res.data.info);
                    await login();
                    self.forms = await parseJson(res.data);
                }
            },
        }
    }
</script>