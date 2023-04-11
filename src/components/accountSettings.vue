<template>
  <div>
    <div class="header">
      <div style="color:#5e84f3;font-size: 1.2em;font-weight: bold;padding-top: 15px"><h1 style="margin: 0 0 0 20px">账号设置管理</h1></div>
      <div style="display: flex;margin: 30px 0 0 20px">
        <div>
          姓名：
          <el-input
            v-model="search.nickname"
            style="width: 220px"
            placeholder="请输入姓名"
          ></el-input>
        </div>
        <div style="margin-left:130px">
          手机号：
          <el-input
            v-model="search.phone"
            style="width: 220px"
            placeholder="请输入手机号"
          ></el-input>
        </div>
        <div style="margin-left:130px">
          状态：
          <el-select v-model="search.status" clearable placeholder="请选择状态">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div style="margin-left:130px">
          创建时间：
          <el-date-picker
            v-model="search.created_at"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>
      </div>
      <div style="float: right;margin:20px 35px 0 0">
        <el-button @click="refresh()" style="color: #5086ff;background: #e7f0fb">重置</el-button>
        <el-button @click="appQuery" style="color: #fff;background:#5086ff">查询</el-button>
      </div>
    </div>
    <div class="footer">
      <div style="margin-left: 20px;padding-top: 15px">
        <div style="margin-bottom: 15px">
          <el-button @click="dialogVisible = true,change = '添加内容'" style="background: #5086ff;color: #fff;border-radius: 10px"><i class="el-icon-plus"></i> 添加账号</el-button>
        </div>
        <div>
          <el-table
            :data="appList"
            border
            style="border-radius: 15px;"
            :cell-style="tableRowStyle"
            :header-cell-style="tableHeaderStyle"
            v-loading="appLoading"
            element-loading-text="加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
          >
            <el-table-column type="index" label="序号" width="90">
            </el-table-column>
            <el-table-column prop="nickname" label="姓名">
            </el-table-column>
            <el-table-column prop="phone" label="手机号"> </el-table-column>
            <el-table-column prop="role" label="角色"></el-table-column>
            <el-table-column prop="ddd" label="设备型号">HUAWEIP50
            </el-table-column>
            <el-table-column prop="username" label="账号"> </el-table-column>
            <el-table-column prop="" label="密码">
              <template slot-scope="scope">
                <el-popover
                  placement="top"
                  title="密码"
                  ref="popover"
                  width="200"
                  trigger="focus"
                  :content=scope.row.password>
                </el-popover>
                <div style="display: flex;justify-content: center;align-items: center">
                  ********* <i v-popover:popover style="font-size: 1.3em;margin: 0 0 2px 0.4em;display: flex;align-items: center;color: #8cc5ff;cursor:pointer;"  class="el-icon-view"></i>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="status" label="状态">
              <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-value="1"
                inactive-value="0">
              </el-switch>
              </template>
            </el-table-column>
            <el-table-column prop="created_at" label="创建时间"> </el-table-column>
            <el-table-column prop="" label="操作">
              <template slot-scope="scope">
              <el-button @click="editRowList(scope.row)" type="text">编辑</el-button>
              <el-button  @click="delList(scope.row)" type="text" style="color: red">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="page">
          <el-pagination
            @current-change="appListChange"
            :page-sizes="[10]"
            :page-size="10"
            layout="sizes, prev, pager, next"
            :total="appTotal"
          >
          </el-pagination>
        </div></div>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="delDialogVisible"
      width="30%"
    >
      <span>确定要删除吗</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="delDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="delDialogVisible = false,deleteRow()">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog
      :title= this.change
      :visible.sync="dialogVisible"
      width="40%"
    >
      <div>
        <div style="margin-top: 50px"> <span  style="margin-left: 2em">用户名： </span>
          <el-input
            v-model="addUser.username"
            placeholder="请输入用户名"
            style="width: 30%"
          ></el-input>
          <span  style="margin-left: 2em">密码： </span>
          <el-input
            v-model="addUser.password"
            placeholder="请输入密码"
            style="width: 30%"
          ></el-input>
        </div>
        <div style="margin-top: 50px"> <span  style="margin-left: 2em">手机号： </span>
          <el-input
            v-model="addUser.phone"
            placeholder="请输入手机号"
            style="width: 30%"
          ></el-input>
          <span  style="margin-left: 2em">邮箱： </span>
          <el-input
            v-model="addUser.email"
            placeholder="请输入邮箱"
            style="width: 30%"
          ></el-input>
        </div>
        <div style="margin-top: 50px"> <span  style="margin-left: 3em">昵称： </span>
          <el-input
            v-model="addUser.nickname"
            placeholder="请输入昵称"
            style="width: 30%"
          ></el-input>
          <span  style="margin-left: 2em">备注： </span>
          <el-input
            v-model="addUser.remark"
            placeholder="请输入备注"
            style="width: 30%"
          ></el-input>
          <div style="margin:30px 0 0 23.8em"> 状态：
            <el-switch
              v-model="addUser.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0"
              active-text="启用"
              inactive-text="停用"
            >
            </el-switch>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false;addList()">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import { contact } from '@/api/user'
import axios from 'axios'

export default {
  data () {
    return {
      options: [{
        value: '0',
        label: '停用'
      }, {
        value: '1',
        label: '启用'
      }],
      addUser: {
        avatar: '头像11',
        username: '',
        nickname: '',
        phone: '',
        password: '',
        dept_id: '26603003832480',
        role_ids: '18958281338528',
        post_ids: '26602235433632',
        email: '',
        status: '0',
        remark: ''
      },
      search: {},
      change: '',
      dialogVisible: false,
      delDialogVisible: false,
      accessToken: window.localStorage.getItem('access_token'),
      Token: window.localStorage.getItem('Token'),
      appList: {
      },
      appLoading: false,
      appTotal: 0
    }
  },
  mounted () {
    this.getContact()
  },
  methods: {
    async appQuery () {
      await axios.get('/auth/system/user/index', {
        params: this.search,
        headers: {
          Authorization: `Bearer ${this.Token}`,
          'x-api-header': 'yuanxibing',
          'x-access-token': this.accessToken
        }
      }).then(res => {
        this.appList = res.data.data.items
      })
      for (let i = 0; i < this.appList.length; i++) {
        /* await axios.get('/auth/supervise/device/index', {
          params: { dept_id: this.appList[i].dept_id },
          headers: {
            Authorization: `Bearer ${this.Token}`,
            'x-api-header': 'yuanxibing',
            'x-access-token': this.accessToken
          }
        }).then(res => {
          console.log(res)
          this.appList[i].ddd = res.data.data.items[i].device_no
          console.log(999)
          console.log(this.appList)
        }) */
        await axios.get('/auth/system/user/read/' + this.appList[i].id, {
          headers: {
            Authorization: `Bearer ${this.Token}`,
            'x-api-header': 'yuanxibing',
            'x-access-token': this.accessToken
          }
        }).then(res => {
          console.log(res)
          this.appList[i].role = res.data.data.roleList[0].name
          this.appList[i].status = 0
        })
      }
    },
    refresh () {
      this.search = {}
      this.getContact()
    },
    // 表格样式
    tableRowStyle ({ row, rowIndex }) {
      if (rowIndex % 2 === 1) {
        return 'background-color: #F7F7FF;text-align:center'
      } else {
        return 'text-align:center'
      }
    },
    // 表格第一行的设置
    tableHeaderStyle ({ row, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'height: 3.75rem;font-size: 1rem;font-family: Microsoft YaHei;font-weight: bold;line-height: 1.3125rem;color: #333333;text-align:center;background:#ebf5ff'
      }
    },
    async getContact () {
      const accessToken = window.localStorage.getItem('access_token')
      const Token = window.localStorage.getItem('Token')
      await axios.get('/auth/system/user/index', {
        params: {
          page: 1,
          pageSize: 20
        },
        headers: {
          Authorization: `Bearer ${Token}`,
          'x-api-header': 'yuanxibing',
          'x-access-token': accessToken
        }
      }).then(res => {
        this.appList = res.data.data.items
        console.log(this.appList[1].dept_id)
      })
      for (let i = 0; i < this.appList.length; i++) {
        /* await axios.get('/auth/supervise/device/index', {
          params: { dept_id: this.appList[i].dept_id },
          headers: {
            Authorization: `Bearer ${this.Token}`,
            'x-api-header': 'yuanxibing',
            'x-access-token': this.accessToken
          }
        }).then(res => {
          console.log(res)
          this.appList[i].ddd = res.data.data.items[i].device_no
          console.log(999)
          console.log(this.appList)
        }) */
        await axios.get('/auth/system/user/read/' + this.appList[i].id, {
          headers: {
            Authorization: `Bearer ${this.Token}`,
            'x-api-header': 'yuanxibing',
            'x-access-token': this.accessToken
          }
        }).then(res => {
          console.log(res)
          this.appList[i].role = res.data.data.roleList[0].name
          this.appList[i].status = 0
        })
      }
    },
    // 删除
    delList (e) {
      console.log(e)
      this.delDialogVisible = true
      this.rowId = e.id
    },
    async deleteRow () {
      await axios.delete('/auth/system/user/delete/' + this.rowId, {
        headers: {
          Authorization: `Bearer ${this.Token}`,
          'x-api-header': 'yuanxibing',
          'x-access-token': this.accessToken
        }
      }).then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: res.data.message,
            type: 'success'
          })
        } else {
          this.$message({
            message: res.data.message,
            type: 'warning'
          })
        }
        this.getContact()
      })
    },
    // 编辑
    editRowList (e) {
      this.change = '编辑内容'
      this.dialogVisible = true
      this.addUser = e
      this.rowId = e.id
    },
    // 添加
    async addList () {
      if (this.change === '添加内容') {
        await axios.post('/auth/system/user/save', this.addUser, {
          headers: {
            Authorization: `Bearer ${this.Token}`,
            'x-api-header': 'yuanxibing',
            'x-access-token': this.accessToken
          }
        }).then(res => {
          if (res.data.code === 200) {
            this.$message({
              message: res.data.message,
              type: 'success'
            })
          } else {
            this.$message({
              message: res.data.message,
              type: 'warning'
            })
          }
          this.getContact()
          console.log(res)
        })
      }
      // 编辑
      if (this.change === '编辑内容') {
        await axios.put('/auth/system/user/update/' + this.rowId, this.addUser, {
          headers: {
            Authorization: `Bearer ${this.Token}`,
            'x-api-header': 'yuanxibing',
            'x-access-token': this.accessToken
          }
        }).then(res => {
          console.log(res)
          if (res.data.code === 200) {
            this.$message({
              message: res.data.message,
              type: 'success'
            })
          } else {
            this.$message({
              message: res.data.message,
              type: 'warning'
            })
          }
          this.getContact()
        })
      }
    },
    // 分页
    async appListChange () {

    }
  }
}
</script>

<style scoped>
.header{
  width: 100%;
  height: 200px;
  background: #fff;
  border-radius: 15px;
}
.footer{
  width: 100%;
  height: 100%;
  background: #fff;
  margin-top: 20px;
  border-radius: 15px;
}
.page {
  padding: 0 1.25rem 1.25rem 1.25rem;
  text-align: right;
}
</style>
