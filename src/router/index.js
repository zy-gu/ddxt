import Vue from 'vue'
import Router from 'vue-router'

import home from '@/components/home'
import login from '@/components/login'
import search from '@/components/search'
import subOrder from '@/components/subOrder'
import orderInfo from '@/components/orderInfo'
import homeMenu from '@/components/homeMenu'
import memberCen from '@/components/memberCen'
import shopInfo from '@/components/shopInfo'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: login,
      beforeEnter: (to, from, next) => {
        if (to.name === 'login'&&from.path!=='/') {
          next(false)
        }else {
          next()
        }
      },
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      beforeEnter: (to, from, next) => {
        if (to.name === 'login'&&from.path!=='/') {
          next(false)
        }else {
          next()
        }
      },
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      children: [
        {
          path: '/home/homeMenu',
          name: 'homeMenu',
          component: homeMenu,
          children: [
            {
              path: '/home/homeMenu/search',
              name: 'search',
              component: search
            },
            {
              path: '/home/homeMenu/subOrder',
              name: 'subOrder',
              component: subOrder
            }, {
              path: '/home/homeMenu/orderInfo',
              name: 'orderInfo',
              component: orderInfo
            },
          ]
        },
        {
          path: '/home/memberCen',
          name: 'memberCen',
          component: memberCen
        },
        {
          path: '/home/shopInfo',
          name: 'shopInfo',
          component: shopInfo
        }
      ]
    }
  ]
})
