import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        currentUser: '',
    },
    mutations: {
        changeUserInfo(ctx, currentUser) {
            ctx.currentUser = currentUser
        },
    },
    getters: {
        currentUser: state => state.currentUser,
    }
});

export default store