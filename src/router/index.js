import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home'
import Publish from '@/pages/publish'
import Message from '@/pages/message'
import Mine from '@/pages/mine'
import Login from '@/pages/login'
import Detail from '@/pages/detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/publish',
      name: 'publish',
      component: Publish
    },
    {
      path: '/message',
      name: 'message',
      component: Message
    },
    {
      path: '/mine',
      name: 'mine',
      component: Mine
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail
    }
  ]
})
