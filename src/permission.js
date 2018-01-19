import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式

import {
  Message
} from 'element-ui'

import {
  getToken
} from '@/utils/auth' // 验权

import {
  needfreshlist
} from '@/api/separatelist' // 获取需要刷新路由列表

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next({
        path: '/'
      })
    } else {
      next()
      // let freshRouterList = needfreshlist();
      // let routerPath = to.path;
      // if (freshRouterList.indexOf(routerPath) > -1) {
      //   let timeHashStr = new Date();
      //   let hashTime = timeHashStr.getTime();
      //   console.log(hashTime)
      //   next({
      //     path: to.path,
      //     query: hashTime
      //   })
      // } else {
       
      // }

      //   store.dispatch('GetPermissing',this).then(res => { // 拉取用户信息
      //     next()
      //   }).catch(() => {
      //     store.dispatch('FedLogOut').then(() => {
      //       Message.error('验证失败,请重新登录')
      //       next({
      //         path: '/login'
      //       })
      //     })
      //   })
    }
    NProgress.done()
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
