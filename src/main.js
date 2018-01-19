import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control

import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'
import { getPermissing } from '@/api/login' //获取一波假数据

Vue.use(ElementUI)

Vue.config.productionTip = false

window.VueElement = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  },
  created: function () {
    //刷新页面，token取菜单列表
    let token = getToken();
    if (!token) {
      this.$router.push({
        path: "/login"
      });
      return;
    }
    //获取路由，渲染菜单
    this.$store.dispatch("GetPermissing").then(res => {
      //初始化顶层按钮
      this.$store.commit("INIT_BROAD", res.broadMap);
      //添加到路由
      this.$router.addRoutes(res.map);
      //添加副菜单
      this.$store.dispatch("SetRouteMap", res.map);
      //跳转至刷新的路由 --- 这很重要，白屏了
      var hash = window.location.hash.substring(1);
      this.$router.push({
        path: hash
      });
    });
  }
})
