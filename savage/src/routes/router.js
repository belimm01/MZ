import Vue from "vue";
import Router from "vue-router";
import UserList from '../pages/UserList'
import UserAccreditationInfo from '../pages/UserAccreditationInfo'

Vue.use(Router);

export default new Router({
    routes: [
        {
            name: 'userList',
            path: '/',
            component: UserList,
        },
        {
            name: 'userAccreditationInfo',
            path: '/userAccreditationInfo',
            component: UserAccreditationInfo,
        },
    ]
});