<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
/**
 * use： 正常vue组件应用方式
 *   <Histogram v-else :chart-data="item.content" :resizePlease="resizePlease"></Histogram>
 * params:
 *      content:对应默认格式与后台确认数组对象：[{
 *                                            count: Num --- 可用
                                              name: String --- 可用
 *                                          }]
 *      resizePlease: 外部触发resize，强行是是chart变动时resize，参考数据后天src/view/dataanalysis/consultation触发方式，也可用autoResize
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
      //获取x轴标注
      var xAxisArr = new Array();
      //获取柱状图数据
      var barData = new Array();
      content.forEach((val, idx) => {
        xAxisArr.push(val.name);
        barData.push(val.count);
      });

      this.chart.setOption({
        xAxis: {
          data: xAxisArr,
          boundaryGap: true,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: ["人数"]
        },
        series: [
          {
            name: "人数",
            itemStyle: {
              normal: {
                color: "#409EFF",
                lineStyle: {
                  color: "#409EFF",
                  width: 2
                }
              }
            },
            smooth: true,
            type: "bar",
            data: barData,
            animationDuration: 2800,
            animationEasing: "cubicInOut"
          }
        ]
      });
    },
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");
      this.setOptions(this.chartData);
    }
  }
};
</script>
