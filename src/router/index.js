import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
import Welcome from '@/views/welcome/Welcome'
import User from '@/views/user/User'
import Rights from '@/views/right/Rights'
import Roles from '@/views/right/Roles'
Vue.use(Router) 

export default new Router({
  routes: [
    // 登入页面的路由
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    // 首页的路由
    {
      path:'/',
      name:'Home',
      redirect:{path:'welcome'},
      component:Home,
      children:[
        {
          name:'Welcome',
          path:'Welcome',
          component:Welcome
        },
        {
          name:'User',
          path:'User',
          component:User
        },
       {
        name:'Rights',
        path:'rights',
        component:Rights,
       },
       {
        name:'Roles',
        path:'roles',
        component:Roles,
       },
      ]
    }
  ]
})
