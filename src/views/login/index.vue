<template>
  <div class="login-container">
    <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px"
      class="card-box login-form">
      <h3 class="title">登录</h3>
      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user" />
        </span>
        <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="username" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"></svg-icon>
        </span>
        <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
          placeholder="password"></el-input>
          <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye" /></span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
          Sign in
        </el-button>
      </el-form-item>
      <!-- <div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        </span> password: admin</span>
      </div> -->
    </el-form>
  </div>
</template>

<script>
import Layout from "@/views/layout/Layout";
const _import = require("@/router/_import_" + process.env.NODE_ENV);
import { isvalidUsername } from "@/utils/validate";
import { getToken, setToken, removeToken } from "@/utils/auth";

export default {
  name: "login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error("用户名不能为空"));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value.length == 0) {
        callback(new Error("密码不能为空"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [{ required: true, trigger: "blur", validator: validatePass }]
      },
      loading: false,
      pwdType: "password"
    };
  },
  methods: {
    showPwd() {
      if (this.pwdType === "password") {
        this.pwdType = "";
      } else {
        this.pwdType = "password";
      }
    },

    /*
      在登陆成功后调用并配置所有的导航菜单
      res为返回的导航菜单列表（和权限有关），实现动态列表
      关联：src/store app.js 
      渲染关联：\src\views\layout\components\Sidebar （核心，多关注）
    */

    addrouter() {
      //得到数据结构后转换 路由规则
      /**
      * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
      * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
      * name:'router-name'             the name is used by <keep-alive> (must set!!!)
      * broadId                        确定顶部大导航切换： 孕期私人医生1（broadId:0），
                                                          孕期私人医生2（broadId:1）//以此类推,具体数据由后台返回
                                                          可能需要二次封装
                                                          关联\src\store\modules\app.js --- state.app.broads(不知道数据结构，现写死，后期动态获取通过commit进行赋值)
      * meta : {
          title: 'title'               the name show in submenu and breadcrumb (recommend set)
          icon: 'svg-name'             the icon show in the sidebar,
        }
      * constantRouterMap              需要后期通过后台返回具体数据，此处为demo格式，没有接口不知道数据，要考虑好多东西，心累
                                      可能需要将登录拆分出去，登录后一次后台请求完成初始化
                                      ajax -- vueRouter实例 -- vue实例 --初始界面
      **/
      const that = this;
      this.$store.dispatch("GetPermissing").then(res => {
        //初始化顶层按钮
        this.$store.commit("INIT_BROAD", res.broadMap);
         //添加到路由
        this.$router.addRoutes(res.map);
        //添加副菜单
        this.$store.dispatch("SetRouteMap", res.map);
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("Login", this.loginForm)
            .then(res => {
              //登录成功，存用户名
              let username = this.loginForm.username;
              localStorage.setItem("ibabyDataBackUserName", username);
              this.loading = false;
              //添加动态路由表

              this.addrouter();

              this.$router.push({ path: "/" });
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  created() {
    //取username
    var username = localStorage.getItem("ibabyDataBackUserName");
    if (username) {
      this.loginForm.username = username;
    }
    
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import "src/styles/mixin.scss";
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  @include relative;
  height: 100vh;
  background-color: $bg;
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
    -webkit-text-fill-color: #fff !important;
  }
  input {
    background: transparent;
    border: 0px;
    -webkit-appearance: none;
    border-radius: 0px;
    padding: 12px 5px 12px 15px;
    color: $light_gray;
    height: 47px;
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
}
</style>
