<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <el-dropdown @command="handleCommand">
      <el-button type="primary">
        {{currentBroadTypename}}<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="item in broads" v-bind:key="item.broadId" :command="item.broadId">{{item.typename}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!-- <div class="dropdown-hasChoosed">当前：<span class="currentBroadTypename">({{currentBroadTypename}})</span> </div> -->
    <nowtimer></nowtimer>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'">
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            Home
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span @click="logout" style="display:block;">LogOut</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import { mapGetters } from "vuex";
import Hamburger from "@/components/Hamburger";
import Nowtimer from "@/components/Nowtimer";

export default {
  components: {
    Hamburger,
    Nowtimer
  },
  computed: {
    ...mapGetters(["sidebar", "avatar"]),
    broads(){
      return this.$store.state.user.broads
    },
    currentBroadTypename(){
      return this.$store.state.user.currentBroadTypename
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("ToggleSideBar");
    },
    logout() {
      this.$store.dispatch("LogOut").then(() => {
        location.reload(); // 为了重新实例化vue-router对象 避免bug
      });
    },
    handleCommand(command){
      this.$store.commit("ChangeBroad",command);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.currentBroadTypename{
  font-weight: bold;
  color: #409EFF
}
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .dropdown-hasChoosed{
   display: inline-block;
    height: 50px;
    line-height: 50px;
  }
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>

