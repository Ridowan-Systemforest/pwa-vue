import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import IndexPage from '@/components/Index'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login
        },
        {
            path: '/index',
            name: 'Index',
            component: IndexPage
        }
    ]
})