<template>
  <div>
    <div class="header">
      <div style="color:#5e84f3;font-size: 1.2em;font-weight: bold;padding-top: 15px"><h1 style="margin: 0 0 0 20px">督察内容列表</h1></div>
      <div style="display: flex;margin: 30px 0 0 20px">
        <div style="margin-left:100px">
          督察类别：
          <el-select v-model="value" clearable placeholder="请选择督察类别">
            <el-option
              v-for="item in qoptions"
              :key="item.value1"
              :label="item.label1"
              :value="item.value1">
            </el-option>
          </el-select>
        </div>
        <div style="margin-left:100px">
          督察内容：
          <el-autocomplete
            class="inline-input"
            v-model="state"

            placeholder="请输入督察内容"
            :trigger-on-focus="false"

          ></el-autocomplete>
        </div>
        <div style="margin-left:100px">
          创建时间：
          <el-date-picker
            v-model="value1"
            type="date"
            placeholder="选择创建时间">
          </el-date-picker>
        </div>
      </div>
      <div style="margin:-40px 35px 0 0;display:flex;justify-content: right">
        <el-button @click="refresh()" style="color: #5086ff;background: #e7f0fb">重置</el-button>
        <el-button @click="appQuery" style="color: #fff;background:#5086ff">查询</el-button>
      </div>
    </div>
    <div class="footer">
      <div style="margin-left: 20px;padding-top: 15px">
        <div style="margin-bottom: 15px">
          <el-button @click="dialogVisible=true;change = '添加内容'" style="background: #5086ff;color: #fff;border-radius: 10px"><i class="el-icon-plus"></i> 添加督察内容</el-button>
        </div>
        <div>
          <el-table
            :data="superviseList"
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
            <el-table-column prop="super_type" label="督察类别">
            </el-table-column>
            <el-table-column prop="super_content" label="督察内容"> </el-table-column>
            <el-table-column prop="created_at" label="创建时间"> </el-table-column>
            <el-table-column prop="" label="操作">
              <template slot-scope="scope">
              <el-button @click="editRowList(scope.row)" type="text">编辑</el-button>
              <el-button @click="delList(scope.row)" type="text" style="color: red">删除</el-button>
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
      :title= this.change
      :visible.sync="dialogVisible"
      width="40%"
    >
      <div>
        <div>  <span  style="margin-left: 2em">督察类别： </span>
          <el-select v-model="addSuperviseList.super_type" placeholder="请选择"   style="width: 80%">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
       <div style="margin-top: 50px"> <span  style="margin-left: 2em">督察内容： </span>
         <el-input
           v-model="addSuperviseList.super_content"
           placeholder="请输入督察内容"
           style="width: 80%"
         ></el-input></div>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false;addList()">确 定</el-button>
  </span>
    </el-dialog>
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
  </div>
</template>

<script>
import { contact, dataDict } from '@/api/user'
import axios from 'axios'

export default {
  data () {
    return {
      change: '',
      rowId: '',
      options: [
        {
          value: '1',
          label: '内务管理'
        },
        {
          value: '2',
          label: '巡防执勤'
        }
      ],
      delDialogVisible: false,
      accessToken: window.localStorage.getItem('access_token'),
      Token: window.localStorage.getItem('Token'),
      dialogVisible: false,
      state: '',
      time: '',
      addSuperviseList: {
        super_type: '',
        super_content: '',
        created_at: this.time
      },
      editList: {},
      superviseList: {
        super_type: '',
        created_at: '',
        super_content: ''
      },
      appLoading: false,
      appTotal: ''
    }
  },
  mounted () {
    this.getSuperviseList()
    this.dataDict()
    var _this = this
    const yy = new Date().getFullYear()
    const mc = new Date().getMonth() + 1
    const mm = mc < 10 ? '0' + mc : mc
    const dd = new Date().getDate()
    const hh = new Date().getHours()
    const mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()
    const ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds()
    _this.gettime = yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mf + ':' + ss
    console.log(_this.gettime)
    this.time = _this.gettime
  },
  methods: {
    appQuery () {

    },
    refresh () {

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
    async getSuperviseList () {
      const accessToken = window.localStorage.getItem('access_token')
      const Token = window.localStorage.getItem('Token')
      const type = await axios.get('/auth/system/dataDict/list', {
        params: {
          code: 'supervise_type'
        },
        headers: {
          Authorization: `Bearer ${Token}`,
          'x-api-header': 'yuanxibing',
          'x-access-token': accessToken
        }
      })
      await axios.get('/auth/supervise/content/index', {
        headers: {
          Authorization: `Bearer ${Token}`,
          'x-api-header': 'yuanxibing',
          'x-access-token': accessToken
        }
      }).then(res => {
        console.log(res)
        res.data.data.items.map(i => {
          if (i.super_type === '1') {
            i.super_type = type.data.data[0].label
          }
          if (i.super_type === '2') {
            i.super_type = type.data.data[1].label
          }
        })
        console.log(res.data.data.items)
        this.appTotal = res.data.data.items.length
        this.superviseList = res.data.data.items
      })
    },
    // 添加
    async addList () {
      if (this.change === '添加内容') {
        await axios.post('/auth/supervise/content/save', this.addSuperviseList, {
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
          this.getSuperviseList()
          console.log(res)
        })
      }
      // 编辑
      if (this.change === '编辑内容') {
        await axios.put('/auth/supervise/content/update/' + this.rowId, this.addSuperviseList, {
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
          this.getSuperviseList()
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
      await axios.delete('auth/supervise/content/delete/' + this.rowId, {
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
        console.log(res)
        this.getSuperviseList()
      })
    },
    // 编辑
    editRowList (e) {
      this.change = '编辑内容'
      this.dialogVisible = true
      this.addSuperviseList = e
      this.rowId = e.id
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
  height: 150px;
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
