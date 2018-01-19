<template>
  <div class="timerInLine">
    <span class="timeClass">{{thisDate}}</span>
    <!-- <i class="el-icon-edit"></i>
    <span>(1)</span>
    <i class="el-icon-edit"></i>
    <span>(1)</span>
    <i class="el-icon-edit"></i>
    <span>(1)</span>
    <i class="el-icon-edit"></i>
    <span>(1)</span>
    <i class="el-icon-edit"></i>
    <span>(1)</span> -->
  </div>
</template>

<script>
import { parseTime } from "@/utils/index";

export default {
  created() {
    setInterval(() => {
      var nowDate = new Date();
      this.thisDate = parseTime(nowDate);
    }, 1000);
  },
  data() {
    return {
      thisDate: ""
    };
  },
  watch: {
    $route() {}
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.timerInLine {
  display: inline-block;
  vertical-align: top;
  margin-left: 50px;
}
.timeClass{
    font-size: 18px;
    font-weight: b1
}
</style>
