<!-- mother -->
<template>
  <div>
    <da-title tname="孕妈" ></da-title>
    <el-table
        :data="momData"
        border
        fit
        highlight-current-row
        style="width: 100%;margin-top:20px">
        <el-table-column
        align="center"
        prop="index"
        label="序号"
        width="100">
        </el-table-column>
        <el-table-column
        align="center"
        prop="name"
        label="事件名称"
        width="320">
        </el-table-column>
        <el-table-column
        align="center"
        prop="motherNum"
        label="孕妈数量（人）"
         width="150">
        </el-table-column>
        <el-table-column
        align="center"
        prop="explain"
        label="说明">
        </el-table-column>
    </el-table>
  </div>
</template>

<script>
import DaTitle from "@/components/DaTitle";

export default {
  data() {
    return {};
  },

  components: {
    DaTitle
  },

  computed: {
    momData() {
      let getMomStore = this.$store.state.dataanalysis;
      let tableData = [
        {
          index: "1",
          name: "扫码关注服务号",
          motherNum: "0",
          explain: "扫医生二维码并关注服务号的用户数"
        },
        {
          index: "2",
          name: "新增绑定建卡孕妈数",
          motherNum: "0",
          explain: "扫码并绑定成功"
        },
        {
          index: "3",
          name: "提交建卡问诊孕妈数",
          motherNum: "0",
          explain: "成功生产建卡问诊的孕妈数量"
        },
        {
          index: "4",
          name: "提交极速问诊孕妈数",
          motherNum: "0",
          explain: "成功生产极速问诊的孕妈数量"
        },
        {
          index: "5",
          name: "视频观看孕妈数",
          motherNum: "0",
          explain: "该时段内观看视频的孕妈数量"
        }
      ];
      tableData[0].motherNum = getMomStore.focusCount;
      tableData[1].motherNum = getMomStore.newBindCount;
      tableData[2].motherNum = getMomStore.bindConsultCount;
      tableData[3].motherNum = getMomStore.quickConsultCount;
      tableData[4].motherNum = getMomStore.watchVedioCount;
      return tableData;
    }
  },
  methods: {}
};
</script>
<style lang='scss' scoped>

</style>