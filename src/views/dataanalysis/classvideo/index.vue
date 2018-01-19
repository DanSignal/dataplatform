<!-- class video -->
<template>
  <div>
      <da-title tname="课堂视频数据统计"></da-title>
      <el-row class="panel-group" :gutter="40">
        <el-col :xs="8" :sm="8" :md="6" :lg="6" :xl="4" class="card-panel-col">
        <div class="card-panel" >
            <div class="card-panel-description">
            <count-to class="card-panel-num" :startVal="0" :endVal="videoData.videoOrderCount" :duration="2000"></count-to>
                <div class="card-panel-text">
                 <div class="text1">视频订购量(件)</div>
                </div>
            </div>
        </div>
        </el-col>
        <el-col :xs="8" :sm="8" :md="6" :lg="6" :xl="4" class="card-panel-col">
            <div class="card-panel" >
                <div class="card-panel-description">
                <count-to class="card-panel-num" :startVal="0" :endVal="videoData.watchVideoCount" :duration="2000"></count-to>
                    <div class="card-panel-text">
                        <div class="text1">视频播放量(次)</div>
                    </div>                
                </div>
            </div>
        </el-col>
        </el-row>
  </div>
</template>

<script>
import DaTitle from "@/components/DaTitle";
import CountTo from "vue-count-to";
export default {
  data() {
    return {};
  },

  components: {
    DaTitle,
    CountTo
  },

  computed: {
    videoData() {
      return this.$store.state.dataanalysis.bindConsultData.vedioStatisticData;
    },
  },
};
</script>
<style lang='scss' scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col {
    margin-bottom: 32px;
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.1);
    border-color: rgba(0, 0, 0, 0.1);
    transition: all 0.5s ease-out;
    &:hover {
      background: #36a3f7;
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-people {
        background: #40c9c6;
      }
      .icon-message {
        background: #36a3f7;
      }
      .icon-money {
        background: #f4516c;
      }
      .icon-shoppingCard {
        background: #34bfa3;
      }
    }
    .icon-people {
      color: #40c9c6;
    }
    .icon-message {
      color: #36a3f7;
    }
    .icon-money {
      color: #f4516c;
    }
    .icon-shoppingCard {
      color: #34bfa3;
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      text-align: center;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      margin-right: 0px;
      .card-panel-text {
        text-align: center;
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
        margin-top: 12px;
        .text2 {
          font-size: 12px;
        }
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>