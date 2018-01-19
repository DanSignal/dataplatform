import {
  getAnalysisData,
  getAnalysisData2
} from '@/api/getanalysisdata'
import {
  parseTime
} from "@/utils/index";
import {
  Message
} from 'element-ui'

const dataanaylsis = {
  state: {
    data: {},
    searchTime: [],
    bindConsultCount: 0, // 建卡问诊孕妈数量,
    bindConsultData: { // 建卡问诊统计数据,
      consultTimeList: [],
      doctorConsultTopList: [],
      momConsultTopList: [],
      momOrderCountList: [],
      orderCostList: [],
      orderCount: 0,
      responseTimeList: [],
      vedioStatisticData: {
        videoOrderCount: 0,
        watchVideoCount: 0
      }
    },
    focusCount: 0, // 关注孕妈总数量,
    loginCount: 0, //登陆孕妈总数量,
    newBindCount: 0, //新增绑定孕妈数量,
    newCreateQrcodeCount: 0, //新生成二维码医生数量,
    quickConsultCount: 0, //极速问诊孕妈数量,
    quickConsultData: { // 极速问诊统计数据,
      consultTimeList: [],
      doctorConsultTopList: [],
      momConsultTopList: [],
      momOrderCountList: [],
      orderCostList: [],
      orderCount: 0,
      responseTimeList: [],
      vedioStatisticData: {
        videoOrderCount: 0,
        watchVideoCount: 0
      }
    },
    recommandDoctorCount: 0, // 推荐孕妈医生数量,
    updateInfoCount: 0, //完善资料孕妈数量,
    validRecommandDoctorCount: 0, // 有效推荐医生数量,
    watchVedioCount: 0, // 观看视频孕妈数量
  },

  getter: {
    anaData: state => {
      return state.data
    }
  },

  mutations: {
    SET_DATAANALYSIS: (state, data) => {
      state.data = data;
      // var tempdemo = {
      //   bindConsultCount: 1, // 建卡问诊孕妈数量,
      //   bindConsultData: { // 建卡问诊统计数据,
      //     consultTimeList: [
      //       {
      //         count: 100,
      //         name: '6:00-7:00'
      //       },
      //       {
      //         count: 100,
      //         name: '6:00-7:00'
      //       },
      //       {
      //         count: 100,
      //         name: '6:00-7:00'
      //       },
      //       {
      //         count: 100,
      //         name: '6:00-7:00'
      //       },
      //       {
      //         count: 200,
      //         name: '6:00-7:00'
      //       },
      //       {
      //         count: 1340,
      //         name: '6:00-7:00'
      //       },
      //       {
      //         count:1100,
      //         name: '6:00-7:00'
      //       },
      //       {
      //         count: 50,
      //         name: '6:00-7:00'
      //       },
      //       {
      //         count: 190,
      //         name: '6:00-7:00'
      //       }
      //     ],
      //     doctorConsultTopList: [],
      //     momConsultTopList: [],
      //     momOrderCountList: [
      //       {
      //         count: 100 ,
      //         name: '早孕期' ,
      //         percent:  10
      //       },
      //       {
      //         count: 200,
      //         name: '孕期',
      //         percent: 30
      //       },
      //       {
      //         count: 300,
      //         name: '孕期2',
      //         percent: 20
      //       },
      //       {
      //         count: 200,
      //         name: '育儿',
      //         percent: 40
      //       }
      //     ],
      //     orderCostList: [],
      //     orderCount: 1,
      //     responseTimeList: [],
      //     vedioStatisticData: {
      //       videoOrderCount: 1,
      //       watchVideoCount: 1
      //     }
      //   },
      //   focusCount: 1, // 关注孕妈总数量,
      //   loginCount: 1, //登陆孕妈总数量,
      //   newBindCount: 1, //新增绑定孕妈数量,
      //   newCreateQrcodeCount: 1, //新生成二维码医生数量,
      //   quickConsultCount: 1, //极速问诊孕妈数量,
      //   quickConsultData: { // 极速问诊统计数据,
      //     consultTimeList: [],
      //     doctorConsultTopList: [],
      //     momConsultTopList: [],
      //     momOrderCountList: [],
      //     orderCostList: [],
      //     orderCount: 1,
      //     responseTimeList: [],
      //     vedioStatisticData: {
      //       videoOrderCount: 1,
      //       watchVideoCount: 1
      //     }
      //   },
      //   recommandDoctorCount: 1, // 推荐孕妈医生数量,
      //   updateInfoCount: 1, //完善资料孕妈数量,
      //   validRecommandDoctorCount: 1, // 有效推荐医生数量,
      //   watchVedioCount: 1, // 观看视频孕妈数量
      // }
      // var data = tempdemo;
      for (var key in data) {
        let keydata = data[key];
        //dataanaylsis数据结构容错判断
        if (state[key] === undefined) {
          let mes = 'dataanaylsis structure changed, check dataanaylsis.js';
          Message({
            message: mes,
            type: 'error',
            duration: 3 * 1000
          })
        }
        //判断是否是对象，并一一对应赋值
        if (Object.prototype.toString.call(keydata).indexOf('Object') > -1) {
          for (let innerKey in keydata) {
            let innerKeydata = keydata[innerKey];
            if (state[key] !== undefined) {
              state[key][innerKey] = innerKeydata;
            }
          }
        } else {
          state[key] = keydata
        }
      }
    },
    setSearchTime: (state, data) => {
      if (data && data.length === 2) {
        var timerList = [];
        var time0 = data[0] + '';
        var time1 = data[1] + '';
        if (time0.indexOf("-") === 4) {
          timerList.push(time0)
        } else {
          timerList.push(parseTime(time0, "{yyyy}-{mm}-{dd}"));
        }
        if (time1.indexOf("-") === 4) {
          timerList.push(time1)
        } else {
          timerList.push(parseTime(time1, "{yyyy}-{mm}-{dd}"));
        }
      }
      state.searchTime = timerList
    }
  },

  actions: {
    getAnaylsisData: ({
      commit
    }, timeObj) => {
      return new Promise((resolve) => {
        getAnalysisData(timeObj.startTime, timeObj.endTime).then(res => {
          commit('SET_DATAANALYSIS', res.Data)
          commit('setSearchTime', [timeObj.startTime, timeObj.endTime])
          resolve();
        });
      })

    }
  }
}

export default dataanaylsis
