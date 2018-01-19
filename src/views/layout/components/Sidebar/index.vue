<template>
  <div>
    <!-- <div class="navMe">
      <el-menu default-active="00-0" background-color="#ffffff" text-color="#222222" active-text-color="#409EFF" class="totel-menu">
        <el-submenu index="00">
          <template slot="title">孕期私人医生</template>
          <el-menu-item index="00-0">医生APP</el-menu-item>
          <el-menu-item index="00-1">孕妈私人医生</el-menu-item>
        </el-submenu>
      </el-menu>
    </div> -->
    <scroll-bar>
      <el-menu mode="vertical" unique-opened :default-active="$route.path" :collapse="isCollapse" background-color="#304156" text-color="#fff" active-text-color="#409EFF">
        <sidebar-item :routes="routes"></sidebar-item>
      </el-menu>
    </scroll-bar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'

export default {
  components: { SidebarItem, ScrollBar },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      //动态路由修改
      return this.$store.state.app.routemap
      //return this.$router.options.routes
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>

<style>
  .navMe{
    position: relative;
    z-index: 1;
    width: 100%;
    height: 50px;
    background: #fff
  }
  .totel-menu{
    
  }
</style>

