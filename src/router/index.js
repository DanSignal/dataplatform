import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* broadId                        确定顶部大导航切换： 孕期私人医生1（broadId:0），
                                                    孕期私人医生2（broadId:1）//以此类推,具体数据由后台返回
                                                    可能需要二次封装
                                                    关联\src\store\modules\app.js --- state.app.broads(不知道数据结构，现写死，后期动态获取通过commit进行赋值)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
* constantRouterMap              需要后期通过后台返回具体数据，此处为demo格式，没有接口不知道数据，要考虑好多东西，心累
                                 可能需要将登录拆分出去，登录后一次后台请求完成初始化
                                 ajax -- vueRouter实例 -- vue实例 --初始界面
**/
export const constantRouterMap = [{
    path: '/login',
    component: _import('login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: _import('404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    name: 'Home',
    hidden: true,
    children: [{
      path: 'home',
      component: _import('home/index')
    }]
  }
  // 在刷新页面时用token请求页面权限（菜单列表），异步导致404，先去掉
  // {
  //   path: '*',
  //   redirect: '/404',
  //   hidden: true
  // }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
