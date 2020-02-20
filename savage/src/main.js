import Vue from 'vue'
import VueResource from 'vue-resource';
import {BootstrapVue, BootstrapVueIcons} from 'bootstrap-vue'
import router from "./routes/router";

import '@/components/components'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from "./App";

Vue.use({VueResource, BootstrapVue, BootstrapVueIcons});

Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App)
}).$mount("#app");