<template>
<el-container style="height: 700px; border: 1px solid #eee">
  <el-aside width="200px" style="background-color: blanchedalmond;">
    <el-menu :default-openeds="['1']">
      <el-submenu index="1" style="background-color: blanchedalmond">
        <template slot="title" ><i class="el-icon-tickets"></i>
        <span>系统管理</span>
        </template>
        <el-menu-item-group style="background-color: blanchedalmond;">
          <el-menu-item index="1-1" @click="enteradmin">管理员管理</el-menu-item>
          <el-menu-item index="1-2" @click="enterrole">角色管理</el-menu-item>
          <el-menu-item index="1-3" @click="entermenu">菜单管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
  
  <el-container class="rightcon">
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>王小虎</span>
    </el-header>
    <router-view></router-view>
    <!-- are you ok -->
  </el-container>
</el-container>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
   
    methods:{
      
      enteradmin(){
        this.$router.push({
                    path: 'manage',
                })
      },
      enterrole(){
        this.$router.push({
                    path: 'role',
                })
      },
      entermenu(){
        this.$router.push({
                    path: 'menu',
                })
      },
    }
  };
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
  .el-header {
    background-color: blanchedalmond;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
  .rightcon{
    width: 100%;
    box-sizing: border-box;
    overflow-y:auto;
  }
  .el-menu-item,.el-icon-tickets{
    /* color:white; */
  }
</style>