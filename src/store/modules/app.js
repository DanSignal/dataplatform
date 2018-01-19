import Cookies from 'js-cookie'

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus')
    },
    
    /*
      动态路由表，只控制左侧副菜单，数据应与addroute相同
    */
    routemap: [

    ]
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
    },
   
    SET_ROUTEMAP: (state, map)=>{
      state.routemap = map
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },
    SetRouteMap: ({ commit }, map) => {
      commit('SET_ROUTEMAP', map)
    }
  }
}

export default app
