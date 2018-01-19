<!--  -->
<template>
  <div>
      <da-title tname="医生" remark="注：所有数据均来自孕期私人医生小程序"></da-title>
      <el-row class="panel-group" :gutter="40">
        <el-col :xs="8" :sm="8" :md="6" :lg="6" :xl="4" class="card-panel-col">
            <card-panel 
              cardname="新产生二维码数量"
              :endval="newCreateQrcodeCount || 0"
              @click.native="openPage('NewQrcodeNum')"
            ></card-panel>
        </el-col>
        <el-col :xs="8" :sm="8" :md="6" :lg="6" :xl="4" class="card-panel-col">
            <card-panel 
              cardname="推荐孕妈医生数"
              cardnote="（孕妈关注服务号）"
              :endval="recommendDoctors || 0"
              @click.native="openPage('RecommemndMotherDoctorNum')"
            ></card-panel>
        </el-col>
        <el-col :xs="8" :sm="8" :md="6" :lg="6" :xl="4" class="card-panel-col">
            <card-panel 
              cardname="成功推荐并建卡孕妈的医生数"
              cardnote="（孕妈完善资料）"
              :endval="validRecommandDoctorCount || 0"
              @click.native="openPage('RecommemndAndSucMotherDoctorNum')"
            ></card-panel>
        </el-col>
        </el-row>
  </div>
</template>

<script>
import DaTitle from "@/components/DaTitle";
import CountTo from "vue-count-to";
import CardPanel from "./cardpanel";
import { popupPageList, createVisitedListObj } from "@/api/separatelist";

export default {
  components: {
    DaTitle,
    CountTo,
    CardPanel
  },

  data() {
    return {};
  },
  computed: {
    newCreateQrcodeCount() {
      return this.$store.state.dataanalysis.newCreateQrcodeCount;
    },
    recommendDoctors() {
      return this.$store.state.dataanalysis.recommandDoctorCount;
    },
    validRecommandDoctorCount() {
      return this.$store.state.dataanalysis.validRecommandDoctorCount;
    }
  },
  methods: {
    isActive(route) {
      return route.path === this.$route.path || route.name === this.$route.name;
    },
    openPage: function(name) {
      this.getPopupListData4AddVisitedList(name).then(res => {
        let map = res;
        this.$store.dispatch("addVisitedViews", map).then(views => {
          if (!this.isActive(map)) {
            const latestView = views.slice(-1)[0];
            if (latestView) {
              this.$router.push(latestView.path);
            } else {
              this.$router.push("/");
            }
          }
        });
      });
    },
    getPopupListData4AddVisitedList: function(name) {
      return new Promise((reslove, reject) => {
        //获取routerlist
        let popupRouterList = popupPageList();
        if (popupRouterList && popupRouterList.length) {
          //组装需要的路由对象
          createVisitedListObj(popupRouterList, name).then(res => {
            if (res) {
              reslove(res);
            } else {
              reslove(false);
            }
          });
        } else {
          reslove(false);
        }
      });
    }
  }
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