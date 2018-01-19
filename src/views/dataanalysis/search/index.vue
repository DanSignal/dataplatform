<template>
    <div class="searchbox">
        <div class="time-search-group">
            <el-date-picker
              class="timePicker"
              v-model="timeRange"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions2">
            </el-date-picker>
            <el-button class="searchBtn" type="primary" @click.native="searchByTime" icon="el-icon-search" :disabled="isSearching" :loading="isSearching">搜索</el-button>
        </div>
    </div>
</template>

<script>
import { parseTime } from "@/utils/index";
import { getAnalysisData } from "@/api/getanalysisdata";
let pageVue;
export default {
  data() {
    return {
      timeRange: [this.defaultStartTime(), this.defaultEndTime()],
      isSearching: false,
      pickerOptions2: {
        shortcuts: [
          {
            text: "昨天",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    };
  },
  components: {},
  methods: {
    searchByTime() {
      if (this.timeRange && this.timeRange.length == 2) {
        let startTime = this.serachStartTimeParse;
        let endTime = this.serachEndTimeParse;
        let obj = {
          startTime,
          endTime
        };
        this.isSearching = true;
        this.$store.dispatch("getAnaylsisData", obj).then(() => {
          setTimeout(() => {
            this.isSearching = false;
          }, 500);
        });
      }
    },
    defaultStartTime() {
      var start = new Date();
      start = start.getTime() - 3600 * 1000 * 24 * 7;
      return parseTime(start, "{yyyy}-{mm}-{dd}");
    },
    defaultEndTime() {
      var end = new Date().getTime();
      return parseTime(end, "{yyyy}-{mm}-{dd}");
    }
  },
  computed: {
    serachStartTimeParse() {
      var time = this.timeRange[0] + '';
      if (time.indexOf("-") === 4) {
        return time;
      } else {
        return parseTime(time, "{yyyy}-{mm}-{dd}");
      }
    },
    serachEndTimeParse() {
      var time = this.timeRange[1] + '';
     if (time.indexOf("-") === 4) {
        return time;
      } else {
        return parseTime(time, "{yyyy}-{mm}-{dd}");
      }
    }
  },
  created () {
    pageVue = this;
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.searchbox {
  margin: 0 auto;
}
.searchbox:after {
  content: "";
  display: block;
  width: 0;
  height: 0;
  clear: both;
}
.time-button-group {
  float: left;
  margin-top: 30px;
  margin-right: 200px;
}
.time-search-group {
  float: left;
  margin-top: 30px;
}
.searchBtn {
  float: left;
  margin-left: 40px;
}
.timePicker {
  float: left;
}
</style>
