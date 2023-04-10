<template>
  <div>
    <div class="header">
      <div style="color:#5e84f3;font-size: 1.2em;font-weight: bold;padding-top: 15px"><h1 style="margin: 0 0 0 20px">人员信息管理</h1></div>
      <div style="display: flex;margin: 30px 0 0 20px">
        <div>
          人员姓名：
          <el-autocomplete
            class="inline-input"
            v-model="state"
            :fetch-suggestions="querySearch"
            placeholder="请输入人员姓名"
            :trigger-on-focus="false"
            @select="handleSelect"
          ></el-autocomplete>
        </div>
        <div style="margin-left:130px">
          身份证号：
          <el-autocomplete
            class="inline-input"
            v-model="state"

            placeholder="请输入身份证号"
            :trigger-on-focus="false"

          ></el-autocomplete>
        </div>
        <div style="margin-left:100px">
          日期：
          <el-date-picker
            v-model="value1"
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
          <el-button style="background: #5086ff;color: #fff;border-radius: 10px"><i class="el-icon-plus"></i> 添加人员</el-button>
        </div>
        <div>
          <el-table
            :data="peopleList"
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
            <el-table-column prop="nickname" label="人员姓名">
            </el-table-column>
            <el-table-column prop="" label="性别"> </el-table-column>
            <el-table-column prop="" label="出生年月"> </el-table-column>
            <el-table-column prop="idcard" label="身份证号"></el-table-column>
            <el-table-column prop="" label="所属单位"> </el-table-column>
            <el-table-column prop="" label="职位"> </el-table-column>
            <el-table-column prop="" label="日期"> </el-table-column>
            <el-table-column prop="" label="操作">
              <el-button type="text">编辑</el-button>
              <el-button type="text" style="color: red">删除</el-button></el-table-column>
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
  </div>
</template>

<script>
import { contact } from '@/api/user'
import axios from 'axios'

export default {
  data () {
    return {
      peopleList: {
      },
      appLoading: false,
      appTotal: 0
    }
  },
  mounted () {
    this.getContact()
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
        this.peopleList = res.data.data.items
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
