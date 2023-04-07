<template>
<div >
  <div class="boc">
    <el-container  class="box">
      <el-header>
        <Header></Header>
      </el-header>
      <el-container class="con">
        <!-- <el-aside width="203px"> -->
        <nav-menu></nav-menu>
        <!-- </el-aside> -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</div>
</template>

<script>
import Header from '@/views/header/header.vue'
import navMenu from '@/views/navmenu/navmenu.vue'
export default {
  name: 'home',
  components: {
    navMenu,
    Header
  }
}
</script>

<style scoped>
.boc,.box {
  width: 100%;
  height: 100%;
//background: red;
}

/deep/ .con {
  height: 90%;
}

/deep/ .el-header {
  padding: 0;
  height: 80px !important;
}
/deep/.el-aside {
//overflow: auto;
  background: linear-gradient(180deg, #042B62 0%, #246EDB 100%);
}

/deep/.el-aside::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 0.38rem;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 0.06rem;
}

/deep/.el-aside::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 0.63rem;
  box-shadow: inset 0 0 0.31rem rgba(0, 0, 0, 0.2);
  background: #535353;
}

/deep/.el-aside::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 0.31rem rgba(0, 0, 0, 0.2);
  border-radius: 0.63rem;
  background: #ededed;
}
</style>
