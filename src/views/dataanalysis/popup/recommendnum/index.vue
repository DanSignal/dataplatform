<template>
  <div class="app-container">
    <el-button type="primary" @click="exportData">导出</el-button>
    <div class="exportBtn"></div>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='医生姓名' width="95">
        <template slot-scope="scope">
          {{scope.row.doctorName}}
        </template>
      </el-table-column>
      <el-table-column label="性别" align="center">
        <template slot-scope="scope">
          {{scope.row.sex==1?'男':'女'}}
        </template>
      </el-table-column>
      <el-table-column label="所在城市" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.city}}</span>
        </template>
      </el-table-column>
      <el-table-column label="职称" align="center">
        <template slot-scope="scope">
          {{scope.row.jobTitleName}}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="科室" align="center">
        <template slot-scope="scope">
          {{scope.row.departmentName}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="权威认证">
        <template slot-scope="scope">
          <span>{{scope.row.auditingStatus | auditFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="注册时间" min-width="160">
        <template slot-scope="scope">
          <span>{{scope.row.addTime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="最后登录时间" min-width="160">
        <template slot-scope="scope">
          <span>{{scope.row.lastLoginTime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="医院等级">
        <template slot-scope="scope">
          <span>{{scope.row.hospitalGrade | hospitalGrade}}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="paginationTop"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="page.sizes"
      :page-size="page.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total">
    </el-pagination>
  </div>
</template>

<script>
import { getRecommemndDocNum } from '@/api/getanalysisdata'
import { exportData } from "@/api/getanalysisdata";

export default {
  name: 'RecommemndMotherDoctorNum',
  data() {
    return {
      list: null,
      listLoading: true,
      page:{
        index: 1,
        size: 10,
        total: 0,
        sizes: [10,50,100,200]
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    handleSizeChange(val) {
      this.page.size = val;
    },
    // 调用列表跳转
    handleCurrentChange(val) {
      this.page.index = val;
      this.fetchData();
    },
    fetchData() {
      this.listLoading = true;
      let startTime = this.$store.state.dataanalysis.searchTime[0];
      let endTime = this.$store.state.dataanalysis.searchTime[1];
      let data = {
        currentPage: this.page.index,
        pageSize: this.page.size,
        startTime: startTime,
        endTime: endTime
      }
      getRecommemndDocNum(data).then(response => {
        this.list = response.Data.dataList;
        this.page.total = response.Data.totalCount;
        this.listLoading = false;
      }).catch(()=>{
         this.listLoading = false;
      });
    },
    exportData() {
      if(!this.list.length){
        this.$message({
          message: '暂无信息可以导出',
          type: 'warning'
        });
        return;
      }
      let startTime = this.$store.state.dataanalysis.searchTime[0];
      let endTime = this.$store.state.dataanalysis.searchTime[1];
      exportData('exportRecPregnantMothers?startTime='+startTime+'&endTime='+endTime);
    }
  },
 
  filters: {
    auditFilter(status) {
      let state;
      switch(status){
        case -1: state = '认证失败';break;
        case 0: state = '未认证';break;
        case 1: state = '已认证';break;
        default: state = '未知';break;
      }
      return state;
    },
    hospitalGrade(status) {
      let state;
      switch(status){
        case 1: state = '三级甲等';break;
        case 2: state = '三级乙等';break;
        case 3: state = '三级丙等';break;
        case 4: state = '二级甲等';break;
        case 5: state = '二级乙等';break;
        case 6: state = '二级丙等';break;
        case 7: state = '一级甲等';break;
        case 8: state = '一级乙等';break;
        case 9: state = '一级丙等';break;
        case 99: state = '无';break;
        default: state = '未知';break;
      }
      return state;
    }
  }
}
</script>
<style scope>
  .exportBtn{
     height: 10px;
  }
  .paginationTop{
    margin-top: 20px;
    float: right;
  }
</style>

