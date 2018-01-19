import Layout from '@/views/layout/Layout'
const _import = require('@/router/_import_' + process.env.NODE_ENV)

export default () => {
  return [
    /*
      broadId:0 --- 孕期私人医生1
      一级导航 医生App
    */
    {
      path: "/example",
      component: Layout,
      name: "Example",
      broadId: 0,
      meta: {
        title: "医生App",
        icon: "example"
      },
      children: [{
          /*
            二级导航 数据分析
          */
          path: "DataAmalysis",
          component: _import("dataanalysis/index"),
          name: "DataAmalysis",
          meta: {
            title: "数据分析1",
            icon: "table"
          }
        },
        // {
        //   path: "table",
        //   component: _import("example1/index"),
        //   name: "TableDome",
        //   meta: {
        //     title: "凑数演示页",
        //     icon: "table"
        //   }
        // }
      ]
    },

    /*
      broadId:0 --- 孕期私人医生1
      一级导航 孕妈私人医生
    */
    // {
    //   path: "/form",
    //   component: Layout,
    //   broadId: 0,
    //   meta: {
    //     title: "孕妈私人医生",
    //     icon: "example"
    //   },
    //   children: [{
    //     path: "index",
    //     name: "FormX",
    //     component: _import("example2/index"),
    //     meta: {
    //       title: "凑数演示页",
    //       icon: "form"
    //     }
    //   }]
    // },

    /*
      broadId:1 --- 孕期私人医生2
      一级导航 私人2
    */
    // {
    //   path: "/personl2",
    //   component: Layout,
    //   broadId: 1,
    //   meta: {
    //     title: "私人2",
    //     icon: "example"
    //   },
    //   /*
    //     二级导航 tree
    //   */
    //   children: [{
    //     path: "tree",
    //     name: "Tree",
    //     component: _import("example3/index"),
    //     meta: {
    //       title: "凑数演示页",
    //       icon: "tree"
    //     }
    //   }]
    // },

    //弹出导航 在数据分析页面点击增加tagView
    /*
      此处耦合较强，后期需要维护
      关联文件 \src\views\dataanalysis\doctor\index.vue
      map需要一一对应，否则报错
      组件文件为 \src\views\popup
    */
    {
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
            title: "新产生二维码数量"
          }
        },
        {
          path: "excel4recmomdocnum",
          name: "RecommemndMotherDoctorNum",
          component: _import("dataanalysis/popup/recommendnum/index"),
          meta: {
            title: "推荐孕妈医生数"
          }
        },
        {
          path: "excel4recmomsucdocnum",
          name: "RecommemndAndSucMotherDoctorNum",
          component: _import("dataanalysis/popup/recommendsucnum/index"),
          meta: {
            title: "成功推荐并建卡孕妈的医生数"
          }
        }
      ]
    }
  ];
}
