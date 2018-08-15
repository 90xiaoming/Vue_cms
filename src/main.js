// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from '@/store/store'
// 引入全局的样式
import'./style/index.scss'
import App from './App'
import router from './router'




Vue.use(ElementUI);
Vue.config.productionTip = false
// 注册一个全局守卫，作用是在路由跳转的时候。对路由进行判断，防止未登录的用户
// 跳转到其他页面去
router.beforeEach((to, from, next) => {
  let token=localStorage.getItem('mytoken')
  if(token){
    // 已经登录了不阻止
      next()
  }else{
    // 如果没登录。但访问的是需要登录的页面，那就强制跳到登录页面
    if(to.path!=='/Login'){
      next({path:'/Login'})
    }else{
      // 如果没登录。访问的是登录页面。也不会阻止
      next();
    }
  }
})





/* eslint-disable no-new */
new Vue({
  el: '#app',
  // 5.在实例中注入vuex
  store,
  router,
  components: { App },
  template: '<App/>'
})
