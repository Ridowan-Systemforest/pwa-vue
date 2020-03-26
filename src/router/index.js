import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import UserData from '@/components/UserData'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login
        },
        {
            path: '/UserData',
            name: 'UserData',
            component: UserData
        }
    ]
})