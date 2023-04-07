<template>
  <div>
    <div class="header">
      <div style="color:#5e84f3;font-size: 1.2em;font-weight: bold;padding-top: 15px"><h1 style="margin: 0 0 0 20px">岗位管理</h1></div>
      <div style="display: flex;margin: 30px 0 0 20px">
        <div>
          岗位：
          <el-autocomplete
            class="inline-input"
            v-model="state"
            :fetch-suggestions="querySearch"
            placeholder="请输入岗位名"
            :trigger-on-focus="false"
            @select="handleSelect"
          ></el-autocomplete>
        </div>
        <div style="margin-left: 100px">
          <el-button @click="refresh()" style="color: #5086ff;background: #e7f0fb">重置</el-button>
          <el-button @click="appQuery" style="color: #fff;background:#5086ff">查询</el-button>
        </div>
      </div>
    </div>
    <div class="footer">
      <div style="margin-left: 20px;padding-top: 15px">
        <div style="margin-bottom: 15px">
          <el-button style="background: #5086ff;color: #fff;border-radius: 10px"><i class="el-icon-plus"></i> 添加部门</el-button>
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
            <el-table-column prop="id" label="岗位名称  ">
            </el-table-column>
            <el-table-column prop="name" label="岗位代码"> </el-table-column>
            <el-table-column prop="" label="负责人电话"> </el-table-column>
            <el-table-column prop="" label="排序"> </el-table-column>
            <el-table-column prop="" label="备注信息"> </el-table-column>
            <el-table-column prop="created_at" label="创建时间"> </el-table-column>
            <el-table-column prop="" label="操作">
              <el-button type="text">编辑</el-button>
              <el-button type="text">详情</el-button>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { contact } from '@/api/user'
import axios from 'axios'

export default {
  data () {
    return {
      appList: {
        created_at: '',
        id: '',
        name: ''
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
      await axios.get('/auth/system/post/index', {
        params: {
          page: 1,
          pageSize: 20,
          name: '普通',
          leader: 'normal',
          status: 0,
          orderBy: 'name'
        },
        headers: {
          Authorization: `Bearer ${Token}`,
          'x-api-header': 'yuanxibing',
          'x-access-token': accessToken
        }
      }).then(res => {
        this.appList = res.data.data.items
        console.log(res)
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
  height: 150px;
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
