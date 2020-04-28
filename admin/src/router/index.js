import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import homeChildren from '@/router/homeChildren/routercfg.js';
import login from "@/view/login"

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path: '/',
      // redirect:"/index",
      meta:{
        isLogin:true
      },
      name: 'HelloWorld',
      component: HelloWorld,
      //设置菜单二级路由；
      children:homeChildren.routes
    },
    {
      path:"/login",
      // meta:{
      //   isLogin:false
      // },
      name:"login",
      component:login
    }

  ]
})
