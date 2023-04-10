<template>
  <div>
    <div class="header">
      <div style="color:#5e84f3;font-size: 1.2em;font-weight: bold;padding-top: 15px"><h1 style="margin: 0 0 0 20px">人机关联记录</h1></div>
      <div style="display: flex;margin: 30px 0 0 20px">
        <div>
          领用人员姓名：
          <el-autocomplete
            class="inline-input"
            v-model="state"
            :fetch-suggestions="querySearch"
            placeholder="领用人员姓名"
            :trigger-on-focus="false"
            @select="handleSelect"
          ></el-autocomplete>
        </div>
        <div style="margin-left:100px">
          所属单位：
          <el-autocomplete
            class="inline-input"
            v-model="state"

            placeholder="请输入所属单位"
            :trigger-on-focus="false"

          ></el-autocomplete>
        </div>
        <div style="margin-left:100px">
          状态：
          <el-select v-model="value" clearable placeholder="请选择状态">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div style="margin-left:100px">
          领用时间：
          <el-date-picker
            v-model="value2"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions">
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
        <el-button @click="dialogVisible=true" style="background: #5086ff;color: #fff;border-radius: 10px"><i class="el-icon-plus"></i> 添加关联</el-button>
        <el-button style="background: red;color: #fff;border-radius: 10px"><i class="el-icon-delete"></i> 删除</el-button>
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
            <el-table-column  type="selection" width="90">
            </el-table-column>
            <el-table-column type="index" label="序号" width="90">
            </el-table-column>
            <el-table-column prop="nickname" label="领用人员姓名">
            </el-table-column>
            <el-table-column prop="dept.name" label="所属单位"> </el-table-column>
            <el-table-column prop="devices[0].device_band" label="设备品牌"> </el-table-column>
            <el-table-column prop="devices[0].device_no" label="设备型号"> </el-table-column>
            <el-table-column prop="devices[0].device_code" label="设备唯一标识"> </el-table-column>
            <el-table-column prop="status" label="状态">
              <template slot-scope="scope">
                <el-popover
                  placement="top"
                  width="160"
                  style="position: fixed;z-index: 555"
                  v-model="scope.row.visible">
                  <p>确定要{{scope.row.text}}</p>
                  <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text" @click="scope.row.visible = false">取消</el-button>
                    <el-button type="primary" size="mini" @click="scope.row.visible = false;change(scope.row)">确定</el-button>
                  </div>
                </el-popover>
                <el-switch
                  slot="reference"
                  :value="scope.row.status"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :active-value="1"
                  :inactive-value="0"
                  active-text="启用"
                  inactive-text="停用"
                  @click.native.prevent="changeListType(scope.row)"
                >
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column prop="created_at" label="领用时间"> </el-table-column>
            <el-table-column prop="" label="操作">
              <el-button type="text">编辑</el-button>
              <el-button type="text" style="color: red">删除</el-button>
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
      title="添加关联"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose">
      <div>
        领用人员姓名：
        <el-input
          style="width: 220px"
          v-model="state"
          placeholder="请输入领用人员姓名"
        ></el-input>
        <span style="margin-left: 60px">所属单位：</span>
        <el-input
          v-model="state"
          style="width: 220px"
          placeholder="请输入所属单位"
        ></el-input>
        <div style="margin:20px 0 0 2em">
          设备品牌：
          <el-input
            v-model="state"
            style="width: 220px;"
            placeholder="请输入设备品牌"
          ></el-input>
          <span style="margin-left: 60px">设备型号：</span>
          <el-input
            v-model="state"
            style="width: 220px;"
            placeholder="请输入设备型号"
          ></el-input>
        </div>
        <div  style="margin-top: 20px">
          设备唯一标识：
          <el-input
            v-model="state"
            style="width: 220px"
            placeholder="请输入所属单位"
          ></el-input>
        </div>
        <div style="margin:-30px 0 0 29.4em"> 状态：
          <el-switch
            v-model="status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="100"
            inactive-value="0">
          </el-switch></div>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
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
      dialogVisible: false,
      state: '',
      appList: {
        nickname: '',
        created_at: '',
        dept: {
          name: ''
        },
        devices: {
        }
      },
      appLoading: false,
      appTotal: 0,
      accessToken: window.localStorage.getItem('access_token'),
      Token: window.localStorage.getItem('Token')
    }
  },
  mounted () {
    this.getContact()
  },
  methods: {
    change (row) {
      console.log(row)
      row.status === 1 ? row.status = 0 : row.status = 1
      axios.put('/auth/supervise/userDevice/update/' + row.id, {
        user_id: row.id,
        device_id: row.dept_id,
        status: row.status
      }, {
        headers: {
          Authorization: `Bearer ${this.Token}`,
          'x-api-header': 'yuanxibing',
          'x-access-token': this.accessToken
        }
      }).then(res => {
        console.log(res)
      })
    },
    changeListType (e) {
      e.visible = true
      if (e.status === 0) {
        e.text = '启用吗？'
      } else {
        e.text = '禁用吗？'
      }
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
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
    async getContact () {
      const accessToken = window.localStorage.getItem('access_token')
      const Token = window.localStorage.getItem('Token')
      await axios.get('/auth/system/user/contact', {
        headers: {
          Authorization: `Bearer ${Token}`,
          'x-api-header': 'yuanxibing',
          'x-access-token': accessToken
        }
      }).then(res => {
        this.appList = res.data.data.items
        console.log(this.appList)
      })
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
  background: #fff;
  margin-top: 20px;
  border-radius: 15px;
}
.page {
  padding: 0 1.25rem 1.25rem 1.25rem;
  text-align: right;
}
</style>
