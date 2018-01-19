<!-- consultation -->
<template>
  <div>
      <da-title :tname="tname" ></da-title>
      <div class="orderNum">{{typeName}}问诊订单数：{{orderCount}} 件</div>
      <el-collapse accordion class="collapseHover" @change="changeColl">
        <!-- 帶table的折叠板 -->
        <el-collapse-item v-for="(item, idx) in collapses" v-bind:key="idx" :name="item.type=='chart' ? 'resizeChart' : idx">
          <template slot="title" >
            <div class="coll-title">{{item.name}}</div>
          </template>
          <div v-if='item.type == "list"'>
            <!-- 使用table列表 -->
            <div class="tabel-cell">
              <!-- table需要再定义 -->
              <el-table
                :data="item.content"
                border
                fit
                highlight-current-row
                style="width:600px">
                <el-table-column
                align="center"
                prop="name"
                :label="item.title"
                width="200"
                >
                </el-table-column>
                <el-table-column
                align="center"
                prop="count"
                label="发生次数"
                width="200"
                name="2">
                </el-table-column>
                <el-table-column
                align="center"
                prop="percent"
                label="占比"
                width="199" 
                name="3">
                </el-table-column>
              </el-table>
            </div>
            <div  v-if='item.typeOther == "pie" && item.content.length' class="pie-cell">
              <Piegram width="600px" :chart-data="item.content" :resizePlease="resizePlease" :totlecount='orderCount'></Piegram>
            </div>
          </div>
          <div v-if='item.type == "chart"'>
            <!-- 使用echarts柱状图 -->
            <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
              <div class='nodata' v-if='!item.content.length'>
                暂时没有数据
              </div>
              <Histogram v-else :chart-data="item.content" :resizePlease="resizePlease"></Histogram>
            </el-row>
          </div>
        </el-collapse-item>
      </el-collapse>
  </div>
</template>

<script>
import DaTitle from "@/components/DaTitle";
import Histogram from "@/components/histogram";
import Piegram from "@/components/piegram";

export default {
  props: ["typename", "typedata"],
  data() {
    return {
      resizePlease: 0,
      activename: "0",
      
    };
  },

  components: {
    DaTitle,
    Histogram,
    Piegram
  },

  computed: {
    //整理出state数据
    orderCount() {
      return this.chargeType("orderCount");
    },
    consultTimeList() {
      return this.chargeType("consultTimeList");
    },
    doctorConsultTopList() {
      return this.chargeType("doctorConsultTopList");
    },
    momConsultTopList() {
      return this.chargeType("momConsultTopList");
    },
    momOrderCountList() {
      return this.chargeType("momOrderCountList");
    },
    orderCostList() {
      return this.chargeType("orderCostList");
    },
    responseTimeList() {
      return this.chargeType("responseTimeList");
    },
    //整体collapses数组封装
    //list: table列表
    //chart: 柱状图
    collapses() {
      return [
        {
          name: "孕妈问诊订单数量列表",
          type: "list",
          typeOther: 'pie',
          title: '孕妈状态',
          content: this.momOrderCountList
        },
        {
          name: "费用（爱心币）",
          type: "list",
          typeOther: 'pie',
          title: '费用区间',
          content: this.orderCostList
        },
        {
          name: "时段",
          type: "chart",
          typeOther: '',
          title: '',
          content: this.consultTimeList
        },
        {
          name: "孕妈问诊排行",
          type: "list",
          typeOther: 'pie',
          title: '孕妈',
          content: this.momConsultTopList
        },
        {
          name: "医生接单排行",
          type: "list",
          typeOther: 'pie',
          title: '医生',
          content: this.doctorConsultTopList
        },
        {
          name: "医生响应时间",
          type: "list",
          typeOther: 'pie',
          title: '响应时间',
          content: this.responseTimeList
        }
      ];
    },
    typeName() {
      return this.typename;
    },
    typeData() {
      return this.typedata;
    },
    tname() {
      return this.typeName + "问诊数据统计";
    }
  },

  methods: {
    changeColl(activename) {
      //当选中打开的是图表，随便写点什么进去触发chart.resize
      if (activename == "resizeChart") {
        this.resizePlease += 1;
      }
    },
    //辅助函数
    chargeType(key) {
      var type = this.typeData;
      var list = this.$store.state.dataanalysis[type][key];
      var retList = [];
      if(list.length){
        var listTemp = [...list];
        listTemp.forEach(val => {
          var obj = {
            count: val.count,
            name:  val.name,
            percent: 0,
            type:  val.type
          };
          if(val.percent){
            obj.percent = parseFloat(val.percent * 100).toFixed(2)  + '%'
          }
          retList.push(obj)
        })
      }
      if(list instanceof Array){
        return retList
      }else{
        return this.$store.state.dataanalysis[type][key];
      }
    
    },
    formatTableData(){
      //  lineChartData: {
      //   newVisitis: {
      //     expectedData: [
      //       100,
      //       120,
      //       161,
      //       134,
      //       105,
      //       160,
      //       165,
      //       123,
      //       100,
      //       120,
      //       161,
      //       134,
      //       105,
      //       160,
      //       165,
      //       123,
      //       342
      //     ]
      //   }
      // }
    }
  }
};
</script>
<style lang='scss' scoped>
.tabel-cell, .pie-cell{
  float: left;
  padding: 10px;
}

.orderNum {
  line-height: 50px;
  font-size: 14px;
}
.collapseHover {
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.1);
}
.coll-title {
  padding-left: 20px;
  font-weight: bold;
}
.nodata{
  line-height: 1.5;
  text-align: center;
}
</style>