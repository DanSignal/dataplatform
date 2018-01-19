<template>
  <div class="dashboard-container">
    <img class="logo" :src="logo" alt="">
    <div class="welcome-mess">{{name}},欢迎进入iBaby数据管理系统</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import logo from "@/assets/home_images/welcome.png";
import { getToken, setToken, removeToken } from "@/utils/auth";
export default {
  name: 'home',
  data() {
    return {
      logo: logo
    };
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created () {
   
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
img {
  width: auto\9;
  height: auto;
  max-width: 100%;
  vertical-align: middle;
  border: 0;
  -ms-interpolation-mode: bicubic;
}
.logo {
  position: relative;
  z-index: 1;
  margin: 0 auto;
  margin-top: 200px;
  display: block;
  width: 150px;
}
.welcome-mess {
  position: relative;
  z-index: 1;
  text-align: center;
  font-size: 24px;
  margin-top: 15px;
  letter-spacing: 20px;
}
</style>
