<template>
<div>
  <div class="header">
    <div class="header_left">
      <h1 style="margin: 20px 0px 0px 20px">问题类型统计</h1>
      <div style="display: flex;justify-content: space-around;margin-top: 30px">
        <div class="cavan">
          <div class="font">纪律作风</div>
          <div class="font_bottom">4442324</div>
        </div>
        <div class="cavan_blue">
          <div class="font">内务管理</div>
          <div style="color: #5893e9" class="font_bottom">4442324</div>
        </div>
        <div class="cavan_orange">
          <div class="font">巡逻执勤</div>
          <div style="color: #f77c2a" class="font_bottom">4442324</div>
        </div>
        <div class="cavan_purple">
          <div class="font">其他管理</div>
          <div style="color: #639aeb" class="font_bottom">4442324</div>
        </div>
      </div>
    </div>
    <div class="header_right">
      <div style="margin: 20px 0px 0px 20px">
        <h1>个人信息</h1>
        <div style="display: flex">
          <div style="margin-top: 20px">
            <img style="border-radius: 10px; width: 65pt;height: 90pt" :src="photo" alt="">
          </div>
          <div style="margin: 20px 0 0 20px">
            <div style="font-size: 1.2em;font-weight: bold;margin-left: -0.3em">{{ name }}</div>
            <div style="margin-top: 10px"><i style="margin-left: -0.5em" class="iconfont icon-shenfenzhenghao"></i><span style="margin-left:10px;color: #cccccc;font-size: 15px">职<span style="margin-left: 2em">务</span>  &nbsp;</span>{{ position }}</div>
            <div style="margin-top: 10px"><i style="margin-left: -0.3em" class="iconfont icon-map-site"></i><span style="margin-left: 15px;color: #cccccc;font-size: 15px">所属部门 &nbsp;</span>{{ department }}</div>
            <div style="margin-top: 10px"><i style="margin-left: -0.3em" class="iconfont icon-a-zu7723"></i><span style="margin-left: 15px;color: #cccccc;font-size: 15px">所属单位 &nbsp;</span>{{ unit }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="content">
    <div class="content_left">
      <h1 style="padding: 20px 0 0 20px">通知通告</h1>
      <img style="height: 90%;width: 80%;margin-top: 50px" src="../assets/111.png" alt="">
    </div>
    <div class="content_right">
      <div class="top">
        <h1 style="padding: 20px 0 0 20px">待办事项</h1>
        <div style="padding-top: 20px">
          <div style="margin: 0 0 0 20px;display: flex;align-items: center;justify-content: space-evenly"><i class="el-icon-warning"></i><span>您有一条待审批的文件</span>  <el-link style="margin-left: 200px" type="primary">查看</el-link></div>
          <div style="margin: 10px 0 0 20px;display: flex;align-items: center;justify-content: space-evenly"><i class="el-icon-warning"></i><span>您有一条待审批的文件</span>  <el-link style="margin-left: 200px" type="primary">查看</el-link></div>
          <div style="margin: 10px 0 0 20px;display: flex;align-items: center;justify-content: space-evenly"><i class="el-icon-warning"></i><span>您有一条待审批的文件</span>  <el-link style="margin-left: 200px" type="primary">查看</el-link></div>
          <div style="margin: 10px 0 0 20px;display: flex;align-items: center;justify-content: space-evenly"><i class="el-icon-warning"></i><span>您有一条待审批的文件</span>  <el-link style="margin-left: 200px" type="primary">查看</el-link></div>
        </div>
      </div>
      <div class="bottom">
        <el-calendar v-model="value">
        </el-calendar>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: 'personalPortal',
  data () {
    return {
      value: new Date(),
      photo: 'https://ts1.cn.mm.bing.net/th/id/R-C.5ec40427162ff0d0a63c212b8b45dd09?rik=lxt9NS4y%2bF9P9Q&riu=http%3a%2f%2fg.hiphotos.baidu.com%2fzhidao%2fpic%2fitem%2ffd039245d688d43ff153fc7b7c1ed21b0ff43b44.jpg&ehk=04p5MxoUGM97XlEUobKZCjRWjmnHv2mFyKRxmB05560%3d&risl=&pid=ImgRaw&r=0',
      name: '张三',
      position: '刑警',
      unit: '廊坊市公安局',
      department: '督察部'
    }
  }
}
</script>

<style scoped>
/deep/  .el-calendar-table .el-calendar-day {
  font-size: 10px;
  width: 60px;
  height: 25px;
}
/deep/  .el-calendar{
  width: 500px;
}
.header{
  width: 100%;
  display: flex;
}
.header_left{
  border-radius: 20px;
  height: 200px;
  width: 70%;
  background: #fff;
}
.header_right{
  border-radius: 20px;
  margin-left: 1%;
  height: 200px;
  width: 30%;
  background: #fff;
}
.content{
  margin-top: 1%;
  height: 600px;
  width: 100%;
  display: flex;
}
.content_left{
  border-radius: 20px;
  background: #fff;
  width: 70%;
  height: 620px;
  display: flex;
}
.content_right{
  width: 30%;
  height: 620px;
  margin-left: 1%;
}
.top{
  background: #fff;
  width: 100%;
  border-radius: 20px;
  height: 300px;
}
.bottom{
  background: #fff;
  width: 100%;
  height: 300px;
  border-radius: 20px;
  margin-top: 20px;
}
.cavan{
  background-image: url("../assets/red.png");
  background-size: 100%;
  height: 90px;
  width: 210px;
}
.font{
  margin: 25px 0px 0px 85px;
  font-size: 14px;
}
.font_bottom{
  margin: 10px 0px 0px 85px;
  font-size: 1.7em;
  color: red;
}
.cavan_blue{
  background-image: url("../assets/blue.png");
  background-size: 100%;
  height: 90px;
  width: 210px;
}
.cavan_orange{
  background-image: url("../assets/orange.png");
  background-size: 100%;
  height: 90px;
  width: 210px;
}
.cavan_purple{
  background-image: url("../assets/purple.png");
  background-size: 100%;
  height: 90px;
  width: 210px;
}
i{
  color: #8cc5ff;
}
</style>
