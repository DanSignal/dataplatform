<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
/**
 * use： 正常vue组件应用方式
 *  <Piegram width="600px" :chart-data="content" :resizePlease="resizePlease"></Piegram>
 * params:
 *      content:对应默认格式与后台确认数组对象：[{
 *                                            count: Num --- 可用
                                              name: String --- 可用
 *                                          }]
 *      resizePlease: 外部触发resize，强行是是chart变动时resize，参考数据后天src/view/dataanalysis/consultation触发方式，也可用autoResize
 *      totleCount: 饼图总数，用于实现百分比
 */
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts 主题
import { debounce } from "@/utils";

export default {
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "350px"
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Array
    },
    totlecount: {
      type: [String, Number]
    },
    resizePlease: [String, Number]
  },
  data() {
    return {
      chart: null
    };
  },
  mounted() {
    this.initChart();
    if (this.autoResize) {
      this.__resizeHanlder = debounce(() => {
        if (this.chart) {
          this.chart.resize();
        }
      }, 100);
      window.addEventListener("resize", this.__resizeHanlder);
    }

    // 监听侧边栏的变化
    const sidebarElm = document.getElementsByClassName("sidebar-container")[0];
    sidebarElm.addEventListener("transitionend", this.__resizeHanlder);
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    if (this.autoResize) {
      window.removeEventListener("resize", this.__resizeHanlder);
    }

    const sidebarElm = document.getElementsByClassName("sidebar-container")[0];
    sidebarElm.removeEventListener("transitionend", this.__resizeHanlder);

    this.chart.dispose();
    this.chart = null;
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      }
    },
    resizePlease: {
      deep: true,
      handler(val) {
        if (this.chart) {
          this.chart.resize();
        }
      }
    }
  },
  methods: {
    setOptions(content) {
      //原始算法
      let option1 = {
        backgroundColor: "#2c343c",
        title: {
          left: "center",
          top: 20,
          textStyle: {
            color: "#ccc"
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "80%",
            center: ["50%", "50%"],
            data: [],
            roseType: "radius",
            label: {
              normal: {
                textStyle: {
                  color: "rgba(255, 255, 255, 0.3)"
                }
              }
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: "rgba(255, 255, 255, 0.3)"
                },
                smooth: 0.2,
                length: 10,
                length2: 20
              }
            },
            itemStyle: {
              normal: {
                color: "#409EFF",
                shadowBlur: 200,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            },
            animationType: "scale",
            animationEasing: "elasticOut",
            animationDelay: function(idx) {
              return Math.random() * 200;
            }
          }
        ]
      };
      //面积算法
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} ({d}%)"
        },
        calculable: true,
        series: [
          {
            type: "pie",
            radius: [40,120],
            center: ["50%", "50%"],
            roseType: "radius",
            data: []
          }
        ]
      };
      //此处格式转换
      let list = [];
      if (content && content.length) {
        let countsum = 0;
        content.forEach(val => {
          let obj = {
            name: val.name,
            value: val.count
          };
          countsum += val.count;
          list.push(obj);
        });
        if(this.totlecount && countsum < this.totlecount){
          let otherObj = {
            name: '其他',
            value: this.totlecount - countsum
          }
          list.push(otherObj);
        }
        option.series[0].data = list.sort(function(a, b) {
          return a.value - b.value;
        });
      }
      this.chart.setOption(option);
    },
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");
      this.setOptions(this.chartData);
    }
  }
};
</script>
