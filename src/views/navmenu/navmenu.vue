<template>
<div class="menu">
  <div style="padding-top: 20px;height: 100%; overflow:scroll;overflow-y: auto;  overflow-x: hidden;">
    <el-menu
      :default-active="$route.path"
      router
      class="el-menu-vertical-demo"
      >
      <el-menu-item index="/home/personalPortal">
        <i class="iconfont icon-a-lujing4210"></i>
        <span slot="title">个人门户</span>
      </el-menu-item>
      <el-menu-item index="/home/supervisionContentSearch">
        <i class="iconfont icon-a-zu7089"></i>
        <span slot="title">监督内容搜索</span>
      </el-menu-item>
      <el-menu-item index="/home/supervisionContent">
        <i class="iconfont icon-a-zu7089"></i>
        <span slot="title">监督内容统计</span>
      </el-menu-item>
      <el-menu-item index="/home/accountSettings" >
        <i class="iconfont icon-a-lujing4222"></i>
        <span slot="title">账号设置管理</span>
      </el-menu-item>
      <el-menu-item index="/home/permissions">
        <i class="iconfont icon-a-zu7778"></i>
        <span slot="title">权限设置管理</span>
      </el-menu-item>
      <el-menu-item index="/home/peopleInformation">
        <i class="iconfont icon-a-lujing4211"></i>
        <span slot="title">人员信息管理</span>
      </el-menu-item>
      <el-menu-item index="/home/equipment">
        <i class="iconfont icon-a-lujing4215"></i>
        <span slot="title">设备信息管理</span>
      </el-menu-item>
      <el-menu-item index="/home/RelationalRecord">
        <i class="iconfont icon-a-lujing4216"></i>
        <span slot="title">人机关联记录</span>
      </el-menu-item>
      <el-menu-item index="/home/superviseList">
        <i class="iconfont icon-a-zu7779"></i>
        <span slot="title">监督内容列表</span>
      </el-menu-item>
      <el-menu-item index="/home/appLogin">
        <i class="iconfont icon-a-lujing4223"></i>
        <span slot="title">APP登录记录</span>
      </el-menu-item>
      <el-menu-item index="/home/personalCenter">
        <i class="iconfont icon-a-lujing4223"></i>
        <span slot="title">个人中心</span>
      </el-menu-item>
      <el-submenu>
        <template slot="title">
          <i class="iconfont icon-a-lujing4223"></i>
          <span>权限配置</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/home/userControl">
            <i class="iconfont icon-a-zu7779"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-menu-item index="/home/roleManagement">
            <i class="iconfont icon-a-zu7779"></i>
            <span slot="title">角色管理</span>
          </el-menu-item>
          <el-menu-item index="/home/divisionalManagement">
            <i class="iconfont icon-a-zu7779"></i>
            <span slot="title">部门管理</span>
          </el-menu-item>
          <el-menu-item index="/home/postManagement">
            <i class="iconfont icon-a-zu7779"></i>
            <span slot="title">岗位管理</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</div>
</template>

<script>
export default {
  name: 'navmenu'
}
</script>

<style scoped>
.menu{
  background:#fff;
  width: 200px;
  height: 860px;
border-bottom-right-radius: 15px;
  border-right: #ccc solid 1px;
}
span{
  margin-left: 10px;
}
i{
  color: #9fa6b4;
}

</style>
