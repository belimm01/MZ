import Vue from "vue";
import Router from "vue-router";
import UserList from '../pages/UserList'
import UserAccreditationInfo from '../pages/UserAccreditationInfo'
import UserAccreditationInfoForm from "../pages/UserAccreditationInfoForm";

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
            path: '/userAccreditationInfo/:correlationId',
            component: UserAccreditationInfo,
            props: true
        },
        {
            name: 'userAccreditationInfoForm',
            path: '/userAccreditationInfo/:correlationId/edit',
            component: UserAccreditationInfoForm,
            props: true
        },
    ]
});