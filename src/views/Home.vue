<template>
  <!-- 左侧栏 -->
    <div class="home">
        <el-container>
        <el-aside width="auto">
          <div class="logo"></div>
            <el-menu
                :router="true"
                :collapse="isCollapse"
                class="el-menu-admin"
                @open="handleOpen"
                @close="handleClose"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
                <el-submenu index="1">
                    <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>用户管理</span>
                    </template>
                    <el-menu-item index="/user">
                        <i class="el-icon-menu"></i>
                        <span slot="title">用户列表</span>
                    </el-menu-item>
                    </el-submenu>

                     <el-submenu index="2">
                    <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>商品管理</span>
                    </template>
                    <el-menu-item index="/user">
                        <i class="el-icon-menu"></i>
                        <span slot="title">商品列表</span>
                    </el-menu-item>
                    </el-submenu>

                     <el-submenu index="3">
                    <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>权限管理</span>
                    </template>
                    <el-menu-item index="/user">
                        <i class="el-icon-menu"></i>
                        <span slot="title">权限列表</span>
                    </el-menu-item>
                    </el-submenu>

                    <el-submenu index="4">
                    <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>订单管理</span>
                    </template>
                    <el-menu-item index="/user">
                        <i class="el-icon-menu"></i>
                        <span slot="title">订单列表</span>
                    </el-menu-item>
                    </el-submenu>

                    <el-submenu index="5">
                    <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>数据统计</span>
                    </template>
                    <el-menu-item index="/user">
                        <i class="el-icon-menu"></i>
                        <span slot="title">数据列表</span>
                    </el-menu-item>
                    </el-submenu>
            </el-menu>
            
            
        </el-aside>
        <el-container>
          <!-- 头部 -->
            <el-header>
              <i class="myicon myicon-menu toggle-btn" @click="toggleCollapse"></i>
              <div class="system-title">电商后台管理系统</div>
              <div>
                <span class="welcome">
                  你好{{loginUser}}
                </span>
                <el-button type="text" @click="logout">退出</el-button>
              </div>
            </el-header>
            <el-main>
              <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
    </div>
</template>
<script>
import {getUserList} from '@/api';
export default {
  data(){
    return{
      isCollapse:false,
      // 用户名默认空
      loginUser: ''
    }
  },
    // 创建开始把loginuser等于存在本地的user
    created() {
        this.loginUser = localStorage.getItem('user')
    },
    methods: {
        handleOpen(key, keyPath) {
        console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
        console.log(key, keyPath);
        },
       toggleCollapse(){
          this.isCollapse=!this.isCollapse
        },
        logout(){
          // 清除登入状态。就是清除token
          localStorage.removeItem('mytoken')
          // 条到登入页面
          this.$router.push({name:'Login'})
        }
    },
  mounted(){
      let params={params:{query:'',pagenum:1,pagesize:1}}
     getUserList(params).then(res=>{
         console.log(res)
     })
  }
}
</script>
<style lang="scss" scoped>

.home {
  height: 100%;
  background-color: #E5E5E5;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #545c64;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #545c64;
  }
  .logo {
    height:60px;
    background: url(../assets/logo.png);
    background-size: cover;
    background-color: white;
  }
  .toggle-btn {
    padding: 0 10px;
    margin-left: -20px;
    font-size: 36px;
    line-height: 60px;
    color: white;
    cursor: pointer;
    &:hover {
      background-color: #00635a;
    }
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .welcome, {
    color: white;
  }
}
</style>


