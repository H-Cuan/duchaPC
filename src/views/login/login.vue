<template>
<div class="container">
  <div class="content">
    <div class="left">
      <img src="../../assets/logo.png" alt="" style="width: 80pt;height: 80pt">
      <div style="margin-top: 30px;color: #fff">Welcome to</div>
      <div style="margin-top: 30px;font-weight: bold;font-size: 3em;color: #fff">廊坊市督察管理平台</div>
      <div style="margin-top: 30px;width: 2em;border: #fff 3px solid"></div>
      <div style="color: #fff;margin-top: 150px">LANGFANG | INSPECTOR MANAGEMENT PLATFORM</div>
    </div>
    <div class="right">
        <div class="login">
          <span style="margin-top: 50px;font-size: 2.5em;color: #5085ff;">欢迎登录</span>
          <div style="margin-top: 50px; position: relative;width: 70%;height: 80%;">
            <el-input
              placeholder="请输入账号"
              v-model="loginForm.username"
              @keyup.enter.native="logins()"
              >
              <i slot="prefix" class="el-input__icon el-icon-user"></i>
            </el-input>
            <el-input
              style="margin-top: 30px"
              placeholder="请输入密码"
              v-model="loginForm.password"
              show-password
              @keyup.enter.native="logins()">
              <i slot="prefix" class="el-input__icon el-icon-lock"></i>
            </el-input>
            <div style="display: flex;margin-top: 10px;align-items: center">
              <el-input
              placeholder="请输入验证码"
              v-model="loginForm.code"
              @keyup.enter.native="logins()"
            >
            </el-input>
              <img  :src="imageBase64" alt="" style="margin-left: 40px" @click="refresh">
            </div>
            <el-checkbox v-model="checked" style="margin-top: 10px;"><span style="color: #ccc">记住密码</span></el-checkbox>
            <span @click="refresh"  style="color: #8cc5ff;font-size: 14px;margin-left: 100px;cursor:pointer">看不清，换一个试试</span>
            <br>
            <el-button @click="logins()" style="border-radius: 15px;margin-top: 30px;width: 100%;font-size: 1.5em;color: #fff;background: #5085ff">登录</el-button>
          </div>
        </div>
    </div>
  </div>
</div>
</template>

<script>
import { login, token, captcha } from '@/api/user'
import axios from 'axios'
const Base64 = require('js-base64').Base64
export default {
  name: 'login',
  data () {
    return {
      userInfo: {},
      loginForm: {
        username: '',
        password: '',
        code: ''
      },
      checked: true,
      imageBase64: ''
    }
  },
  mounted () {
    this.getToken()
    this.getCode()
    this.getCookie()
  },
  methods: {
    refresh () {
      this.imageBase64 = ''
      this.getCode()
    },
    async getToken () {
      const clientId = 'A0OzMXjA3vQ1nbNBOIt9BKNGhTii8hTC'
      const clientSecret = '5hvJSwP5OlSFo7oNEsII4w2MzsFCu8WA'
      const grantType = 'client_credentials'
      const scope = '*'

      const res = await token({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: grantType,
        scope: scope
      })
      window.localStorage.setItem('access_token', res.access_token)
    },
    async getCode () {
      const accessToken = window.localStorage.getItem('access_token')
      console.log(accessToken)
      axios.get('/auth/system/captcha', {
        headers: {
          'x-api-header': 'yuanxibing',
          'x-access-token': accessToken
        },
        responseType: 'arraybuffer'
      }
      )
        .then((res) => {
          console.log(res)
          const url = 'data:image/png;base64,' + btoa(new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))
          this.imageBase64 = url
        })
    /*  await captcha({
        headers: {
          'x-api-header': 'yuanxibing',
          'x-access-token': accessToken
        },
        responseType: 'arraybuffer'
      }).then((res) => {
        console.log(res)
        const url = 'data:image/png;base64,' + btoa(new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))
        this.imageBase64 = url
      }) */
    },
    // 设置cookie
    setCookie (userId, password, days) {
      const date = new Date() // 获取时间
      date.setTime(date.getTime() + 24 * 60 * 60 * 1000 * days) // 保存的天数
      // 字符串拼接cookie
      window.document.cookie =
        'username' + '=' + userId + ';path=/;expires=' + date.toGMTString()
      window.document.cookie =
        'password' + '=' + password + ';path=/;expires=' + date.toGMTString()
    },
    getCookie () {
      if (document.cookie.length > 0) {
        const arr = document.cookie.split('; ') // 分割成一个个独立的“key=value”的形式
        for (let i = 0; i < arr.length; i++) {
          const arr2 = arr[i].split('=') // 再次切割，arr2[0]为key值，arr2[1]为对应的value
          if (arr2[0] === 'username') {
            this.loginForm.username = arr2[1]
          } else if (arr2[0] === 'password') {
            this.loginForm.password = Base64.decode(arr2[1])// base64解密
            this.checked = true
          }
        }
      }
    },
    async logins () {
      const accessToken = window.localStorage.getItem('access_token')
      const that = this
      axios.post('/auth/system/idcardLogin', this.loginForm, {
        headers: {
          'x-api-header': 'yuanxibing',
          'x-access-token': accessToken
        }
      }).then(res => {
        if (res.data.code === 200) {
          if (this.checked) {
            const password = Base64.encode(this.loginForm.password) // base64加密
            this.setCookie(this.loginForm.username, password, 7)
          } else {
            this.setCookie('', '', -1) // 修改2值都为空，天数为负1天就好了
          }
          that.$message({
            message: res.data.message,
            type: 'success'
          })
          window.localStorage.setItem('Token', res.data.data.token)
          this.$router.push('/home/personalPortal')
        } else {
          console.log(res.data)
          if (res.data.message === 'username 字段是必须的') {
            that.$message({
              message: '请输入用户名',
              type: 'warning'
            })
          }
          if (res.data.message === 'password 字段是必须的') {
            that.$message({
              message: '请输入密码',
              type: 'warning'
            })
          }
          if (res.data.message === 'password 的最小长度为 6 字符') {
            that.$message({
              message: '密码至少6个字符',
              type: 'warning'
            })
          }
          if (res.data.message === 'code 字段是必须的') {
            that.$message({
              message: '请输入验证码',
              type: 'warning'
            })
          }
          if (res.data.code === 1004) {
            that.$message({
              message: '用户不存在',
              type: 'warning'
            })
          }
          if (res.data.code === 1011) {
            that.$message({
              message: '密码不正确',
              type: 'warning'
            })
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.container{
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url("../../assets/background.png");
  background-size: 100%;
  justify-content: center;
  display: flex;
  z-index: 1;
  align-items: center;
}
.content{
  z-index: 2;
  position: fixed;
  width: 60%;
  height: 60%;
}
.left{
  float: left;
  margin: 5% 0px;
}
.right{
  margin: 5% 0px
}
.login{
  border-radius: 20px;
  margin-left: 65%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 40%;
  height: 462px;
  background: #ffffff;
}
i{
  font-size: 23px;
}
</style>
