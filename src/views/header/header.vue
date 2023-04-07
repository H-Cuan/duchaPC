<template>
<div class="head">
  <div class="left">
    <div style="display: flex;justify-content: center;align-items: center"><img style="width: 70px;height: 70px;border-radius: 70px;margin-right: 20px" :src="headPortrait" alt=""></div>
    <h1>{{ name }}</h1>
  </div>
  <div class="center">廊坊市督察管理平台</div>
  <div class="right">
    <div @click="goBack"><i style="color: #fff;font-size:39px" class="iconfont icon-a-zu6654"></i></div>
    <div @click="dialogVisible=true" style="height: 35px;width: 35px;border: #fff 2px solid; border-radius: 50px;display: flex;justify-content: center;align-items: center;margin-left: 10px">
      <div style="height: 25px;width: 25px;background: #fff; border-radius: 50px;display: flex;justify-content: center;align-items: center"><i style="color:#5085ff;" class="el-icon-switch-button"></i></div>
    </div>
  </div>
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="30%"
    close-on-press-escape
    :close-on-click-modal="closeModal"
  >
    <span>确定要退出吗</span>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary"  @click="loginOut">确 定</el-button>
  </span>
  </el-dialog>
</div>
</template>

<script>
import { logout, getInfo } from '@/api/user'
import axios from 'axios'
import router from '@/router'

export default {
  name: 'header',
  data () {
    return {
      headPortrait: '',
      name: '',
      dialogVisible: false,
      closeModal: false
    }
  },
  mounted () {
    this.getInfo()
  },
  methods: {
    goBack () {
      this.$router.back()
    },
    async loginOut () {
      const accessToken = window.localStorage.getItem('access_token')
      const Token = window.localStorage.getItem('Token')
      await axios.post('/auth/system/logout', {}, {
        headers: {
          Authorization: `Bearer ${Token}`,
          'x-api-header': 'yuanxibing',
          'x-access-token': accessToken
        }
      }).then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: '用户已成功退出',
            type: 'success'
          })
          localStorage.removeItem('Token')
          router.push('/')
        } else {
          this.$message.error('退出失败请重试')
        }
      })
      this.dialogVisible = false
    },
    async getInfo () {
      const accessToken = window.localStorage.getItem('access_token')
      const Token = window.localStorage.getItem('Token')
      await axios.get('/auth/system/getInfo', {
        headers: {
          Authorization: `Bearer ${Token}`,
          'x-api-header': 'yuanxibing',
          'x-access-token': accessToken
        }
      }).then(res => {
        console.log(res)
        this.headPortrait = res.data.data.user.avatar
        this.name = res.data.data.user.username
      })
    }
  }
}
</script>

<style scoped>
.head{
  height: 80px;
  width: 100%;
  position: relative;
  background: #5085ff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.center{
font-size: 2.5em;
  color: #fff;
  font-weight: bold;
}
.left{
  margin-left: 100px;
  display: flex;
  align-items: center;
  color: #fff;
}
.right{
  margin-right: 100px;
  font-size: 20px;
  display: flex;
}
</style>
