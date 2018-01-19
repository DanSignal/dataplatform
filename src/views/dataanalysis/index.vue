<template>
    <div class="dataAnalysis">
        <Search></Search>
        <Doctor></Doctor>
        <Mother></Mother>
        <Consultation typename="建卡" typedata="bindConsultData"></Consultation>
        <Consultation typename="极速" typedata="quickConsultData"></Consultation>
        <classvideo></classvideo>
    </div>
</template>

<script>

import { parseTime } from "@/utils/index"
import Search from './search'
import Doctor from './doctor'
import Mother from './mother'
import Consultation from './consultation'
import Classvideo from './classvideo'

export default {
  name: 'dataanalysis',
  components: {
      Search,
      Doctor,
      Mother,
      Consultation,
      Classvideo
  },
  methods: {
    //获取数据分析data，传入store
    getRecentWeekAnalysisData(){
        var startTime = new Date();
        var endTime = parseTime(new Date(),'{yyyy}-{mm}-{dd}');
        startTime.setTime(startTime.getTime() - 3600 * 1000 * 24 * 7);
        startTime = parseTime(startTime,'{yyyy}-{mm}-{dd}');
        var timeObj = {
            startTime,
            endTime
        };
        this.$store.dispatch('getAnaylsisData', timeObj);
    }
  },
  mounted () {
      this.getRecentWeekAnalysisData();
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" >
 .da-page{
     font-size: 20px;
 }
 .dataAnalysis{
    padding: 32px;
 }
</style>
