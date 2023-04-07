<template>
<div>
  <div class="header">
    <div style="color:#5e84f3;font-size: 1.2em;font-weight: bold;padding-top: 15px"><h1 style="margin: 0 0 0 20px">APP登录记录</h1></div>
    <div style="display: flex;margin: 30px 0 0 20px">
      <div>
        登录用户：
        <el-autocomplete
          class="inline-input"
          v-model="state"
          :fetch-suggestions="querySearch"
          placeholder="请输入登录用户名"
          :trigger-on-focus="false"
          @select="handleSelect"
        ></el-autocomplete>
      </div>
      <div style="margin-left:110px">
        设备型号：
        <el-autocomplete
          class="inline-input"
          v-model="state"

          placeholder="请输入设备型号名"
          :trigger-on-focus="false"

        ></el-autocomplete>
      </div>
      <div style="margin-left:110px">
        登录IP：
        <el-autocomplete
          class="inline-input"
          v-model="state"

          placeholder="请输入登录IP"
          :trigger-on-focus="false"

        ></el-autocomplete>
      </div>
      <div style="margin-left:110px">
        登录时间：
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
        <el-table-column prop="" label="登录用户">
        </el-table-column>
        <el-table-column prop="" label="登录IP"> </el-table-column>
        <el-table-column prop="device_band" label="设备品牌"> </el-table-column>
        <el-table-column prop="device_no" label="设备型号"> </el-table-column>
        <el-table-column prop="created_at" label="登录时间"> </el-table-column>
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
    </div>
  </div>
</div>
</template>

<script>
import { appList } from '@/api/user'
import axios from 'axios'

export default {
  name: 'appLogin',
  data () {
    return {
      state: '',
      appList: {
        created_at: '',
        device_band: '',
        device_no: ''

      },
      appLoading: false,
      appTotal: 0
    }
  },
  mounted () {
    this.appListData()
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
    async appListData () {
      const accessToken = window.localStorage.getItem('access_token')
      const Token = window.localStorage.getItem('Token')
      axios.get('/auth/supervise/device/index', {
        headers: {
          Authorization: `Bearer ${Token}`,
          'x-api-header': 'yuanxibing',
          'x-access-token': accessToken
        }
      })
        .then(res => {
          console.log(res.data.data)
          this.appList = res.data.data.items
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
  height: 600px;
  background: #fff;
  margin-top: 20px;
  border-radius: 15px;
}
.page {
  padding: 0 1.25rem 1.25rem 1.25rem;
  text-align: right;
}
</style>
