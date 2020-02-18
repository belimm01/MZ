import Vue from 'vue'
import App from './App.vue'
import store from './store/store'
import VueResource from 'vue-resource';
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use({VueResource, BootstrapVue});
Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
    store,
}).$mount('#app');


