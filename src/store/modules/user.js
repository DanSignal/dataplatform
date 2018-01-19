import {
  login,
  logout,
  getPermissing
} from '@/api/login'

import {
  getToken,
  setToken,
  removeToken,
  setName
} from '@/utils/auth'

import {
  popupPageList
} from '@/api/separatelist'

import {
  Message,
  MessageBox
} from 'element-ui'

import Layout from '@/views/layout/Layout'
const _import = require('@/router/_import_' + process.env.NODE_ENV)

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    roles: [],
    //导航主切换
    /*
      与router关联，详细：\src\router\index.js 
    */
    broads: [],
    currentBroadId: 0,
    currentBroadTypename: ''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name;
      setName(name);
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    INIT_BROAD: (state, broads) => {
      state.broads = broads.concat([]);
      let currentBroad = window.localStorage.getItem('ibabyDataBackCurrentBroad');
      if (currentBroad ){
        currentBroad = JSON.parse(currentBroad);
        state.currentBroadId = currentBroad.broadId;
        state.currentBroadTypename = currentBroad.typename;
      }else{
        state.currentBroadId = broads[0].broadId;
        state.currentBroadTypename = broads[0].typename;
        let broadObj = {
          broadId: broads[0].broadId,
          typename: broads[0].typename
        }
        broadObj = JSON.stringify(broadObj);
        window.localStorage.setItem('ibabyDataBackCurrentBroad', broadObj);
      }
    },
    ChangeBroad: (state, command) => {
      state.currentBroadId = command;
      state.broads.forEach((val) => {
        if (val.broadId == state.currentBroadId) {
          state.currentBroadTypename = val.typename
        }
      });
      let broadObj = {
        broadId: state.currentBroadId,
        typename: state.currentBroadTypename
      }
      broadObj = JSON.stringify(broadObj);
      window.localStorage.setItem('ibabyDataBackCurrentBroad', broadObj);
    },
  },

  actions: {
    // 登录
    Login({
      commit
    }, userInfo) {
      const username = userInfo.username.trim();
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response.Data;
          setToken(data.token)
          commit('SET_TOKEN', data.token);
          commit('SET_NAME', data.userName);
          resolve(data);
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取菜单信息
    GetPermissing({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        getPermissing().then(response => {
          // let routerMapArr = [{
          //     "id": 464556605592448,
          //     "name": "我是添加功能",
          //     "code": "myTestdemo",
          //     "apiPath": "/testt.html",
          //     "parentId": 0,
          //     "subset": []
          //   },
          //   {
          //     "id": 464559296831904,
          //     "name": "孕期私人医生1",
          //     "code": null,
          //     "apiPath": null,
          //     "parentId": 0,
          //     "subset": [{
          //       "id": 464559427035808,
          //       "name": "医生App",
          //       "code": "doctorapp",
          //       "apiPath": null,
          //       "parentId": 464559296831904,
          //       "subset": [{
          //         "id": 464560486062624,
          //         "name": "数据分析",
          //         "code": "dataanalysis",
          //         "apiPath": "dataanalysis/index",
          //         "parentId": 464559427035808,
          //         "subset": []
          //       }]
          //     }]
          //   }
          // ];
          if (!response.Data.length){
            Message({
              message: 'no permissing menu back, check backend',
              type: 'error',
              duration: 3 * 1000
            })
            return true
          }
          let routerMapArr = response.Data;
          let broadMap = [], //顶层按钮菜单
            menuMap = []; //左侧菜单栏
          routerMapArr.forEach(val => {
            var tempObj = {};
            tempObj.typename = val.name;
            tempObj.broadId = val.id;
            broadMap.push(tempObj); //完成按钮菜单
            if (val.subset && val.subset.length) {
              var tempSubObj = val.subset;
              //一级菜单填充
              tempSubObj.forEach(menuVal => {
                //当无code不添加路由和菜单
                if (menuVal.code === ''){
                  Message({
                    message: 'menu without frist pathname(menuVal.code), check user.js',
                    type: 'error',
                    duration: 3 * 1000
                  })
                  return true 
                }
                var menuObj = {
                  path: `/${menuVal.code}`,  //必须要有
                  component: Layout,
                  broadId: val.id,
                  meta: {
                    title: menuVal.name,
                    icon: "example"
                  },
                  children: []
                };
                if (menuVal.subset && menuVal.subset.length) {
                  var menuChild = menuVal.subset;
                  //二级菜单填充
                  menuChild.forEach(menuChildVal => {
                    if (menuChildVal.code === '') {
                      Message({
                        message: 'menu without seconde pathname(menuChildVal.code), check user.js',
                        type: 'error',
                        duration: 3 * 1000
                      })
                      return true
                    }
                    var menuChildObj = {
                      path: menuChildVal.code,
                      component: _import(menuChildVal.apiPath),
                      name: menuChildVal.code,
                      meta: {
                        title: menuChildVal.name,
                        icon: "table"
                      }
                    };
                    menuObj.children.push(menuChildObj);
                  });
                }
                menuMap.push(menuObj); //完成左侧菜单栏
              });
            }
          });
          //获取popup页面，并拼接一起
          let otherNeedConcatArr = popupPageList();
         
          let map = menuMap.concat(otherNeedConcatArr);
          let obj = {
            map,
            broadMap
          }
          resolve(obj);
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          window.localStorage.setItem('ibabyDataBackCurrentBroad', '');
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({
      commit
    }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        window.localStorage.setItem('ibabyDataBackCurrentBroad','');
        resolve()
      })
    }
  }
}

export default user
