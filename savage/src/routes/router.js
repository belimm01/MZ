import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            name: 'userList',
            path: '/',
            component: () => import("../pages/UserList").default // load sync home
        },
        {
            name: 'userAccreditationInfo',
            path: '/userAccreditationInfo',
            component: () => import("../pages/UserAccreditationInfo")
        },
    ]
});