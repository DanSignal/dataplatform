import Layout from '@/views/layout/Layout'
const _import = require('@/router/_import_' + process.env.NODE_ENV)


//在页面中单独显示的独立弹出页面在此数组中添加
export function popupPageList() {
  return [{
    // /popup路径均为页面内部弹出页面使用，请在children里增加
    path: "/popup",
    component: Layout,
    hidden: true,
    /*
    二级导航 弹出excel
    */
    children: [{
        path: "excel4qrcode",
        name: "NewQrcodeNum",
        component: _import("dataanalysis/popup/qrcodenum/index"),
        meta: {
          title: "新产生二维码数量",
          noCache: true
        }
      },
      {
        path: "excel4recmomdocnum",
        name: "RecommemndMotherDoctorNum",
        component: _import("dataanalysis/popup/recommendnum/index"),
        meta: {
          title: "推荐孕妈医生数",
          noCache: true
        }
      },
      {
        path: "excel4recmomsucdocnum",
        name: "RecommemndAndSucMotherDoctorNum",
        component: _import("dataanalysis/popup/recommendsucnum/index"),
        meta: {
          title: "成功推荐并建卡孕妈的医生数",
          noCache: true
        }
      },
      {
        path: "*",
        redirect: "/404",
        hidden: true
      }
    ]
  }]
}

/**
 * 构造适合在store》action中addVisitedViews适合的对象（应该在action中判断，但为保证action的动作单一性将逻辑移植在此处）
 * 目标模板：
 * {
        name: "RecommemndAndSucMotherDoctorNum",
        path: "/popup/excel4recmomsucdocnum",
        meta: {
          title: "成功推荐并建卡孕妈的医生数",
          noCache: true
        }
      }
 */
export function createVisitedListObj(list, name) {
  return new Promise((resolve, reject) => {
    if (Array.isArray(list) && list.length) {
      list.map(val => {
        let pathHead = val.path;
        //直接是一级路由返回，这种情况较少，容错用
        if (val.name === name) {
          let obj = {
            name: val.name || '',
            path: pathHead,
            meta: val.meta
          };
          resolve(obj)
          //返回二级路由对象，标准返回(暂时只有两级路由)
        } else if (val.children.length) {
          let childList = val.children;
          let routerSingalObj = {};
          childList.map(childVal => {
            if (childVal.name === name) {
              routerSingalObj.path = pathHead + '/' + childVal.path;
              routerSingalObj.name = childVal.name;
              routerSingalObj.meta = childVal.meta;
              resolve(routerSingalObj)
            }
          });
          //直接是一级路由返回，这种情况较少，容错用
        } else {
          let obj = {
            name: val.name || '',
            path: pathHead,
            meta: val.meta
          };
          resolve(obj)
        }
      })
    } else {
      resolve(false);
    }
  })
}
