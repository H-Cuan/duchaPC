<template>
  <div>
    <div class="header">
      <div style="color:#5e84f3;font-size: 1.2em;font-weight: bold;padding-top: 15px"><h1 style="margin: 0 0 0 20px">设备信息管理</h1></div>
      <div style="display: flex;margin: 30px 0 0 20px">
        <div>
          设备型号：
          <el-autocomplete
            class="inline-input"
            v-model="state"
            :fetch-suggestions="querySearch"
            placeholder="请输入设备型号"
            :trigger-on-focus="false"
            @select="handleSelect"
          ></el-autocomplete>
        </div>
        <div style="margin-left:130px">
          设备品牌：
          <el-autocomplete
            class="inline-input"
            v-model="state"

            placeholder="请输入设备品牌"
            :trigger-on-focus="false"

          ></el-autocomplete>
        </div>
        <div style="margin-left:130px">
          状态：
          <el-select v-model="value2" clearable placeholder="请选择状态">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div style="margin-left:130px">
          设备唯一标识：
          <el-autocomplete
            class="inline-input"
            v-model="state"
            :fetch-suggestions="querySearch"
            placeholder="请输入设备唯一标识"
            :trigger-on-focus="false"
            @select="handleSelect"
          ></el-autocomplete>
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
          <el-button @click="dialogVisible=true" style="background: #5086ff;color: #fff;border-radius: 10px"><i class="el-icon-plus"></i> 添加设备</el-button>
          <el-button @click="delIndexDialog()" :disabled="disabled" style="background: red;color: #fff;border-radius: 10px"><i class="el-icon-delete"></i> 删除</el-button>
        </div>
        <div>
          <el-table
            :data="appList"
            border
            style="border-radius: 15px;"
            :cell-style="tableRowStyle"
            :header-cell-style="tableHeaderStyle"
            v-loading="appLoading"
            @selection-change="handleSelectionChange">
          >
            <el-table-column  type="selection" width="90">
            </el-table-column>
            <el-table-column type="index" label="序号" width="90">
            </el-table-column>
            <el-table-column prop="device_no" label="设备型号">
            </el-table-column>
            <el-table-column prop="device_band" label="设备品牌"> </el-table-column>
            <el-table-column prop="device_code" label="设备唯一标识"> </el-table-column>
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
            <el-table-column prop="created_at" label="日期"> </el-table-column>
            <el-table-column prop="" label="操作">
              <template slot-scope="scope">
              <el-button type="text">编辑</el-button>
              <el-button type="text" @click="delDialog(scope.row)" style="color: red">删除</el-button>
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
      title="添加设备"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose">
      <div>
        <span  style="margin-left: 2em">设备型号： </span>
        <el-input
          class="inline-input"
          style="width: 200px"
          v-model="addInput.device_no"
          placeholder="请输入设备型号"
        ></el-input>
        <span  style="margin-left: 4em"></span>设备品牌：
        <el-input
          v-model="addInput.device_band"
          placeholder="请输入设备品牌"
          style="width: 200px"
        ></el-input>
        <div style="margin-top: 20px">
          设备唯一标识：
          <el-input
            v-model="addInput.device_code"
            style="width: 200px"
            placeholder="请输入设备唯一标识"
          ></el-input>
          <span  style="margin-left: 4em">设备名称： </span>
          <el-input
            class="inline-input"
            v-model="addInput.device_name"
            placeholder="请输入设备型号"
            style="width: 200px"
          ></el-input></div>
        <div style="margin:30px 0 0 27.8em"> 状态：
          <el-switch
            v-model="addInput.status"
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
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false;appDevice()">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="delDialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>确定要删除吗</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="delDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="delDialogVisible = false,deleteApp()">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="delDialogVisibleIndex"
      width="30%"
      :before-close="handleClose">
      <span>确定要删除吗</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="delDialogVisibleIndex = false, disabled = true">取 消</el-button>
    <el-button type="primary" @click="delDialogVisibleIndex = false,delIndex(), disabled = true">确 定</el-button>
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
      disabled: true,
      id: '',
      multipleSelection: {
        id: ''
      },
      addInput: {
        dept_id: '28338940880032',
        page: 1,
        pageSize: 20
      },
      delDialogVisible: false,
      delDialogVisibleIndex: false,
      accessToken: window.localStorage.getItem('access_token'),
      Token: window.localStorage.getItem('Token'),
      addValue: '',
      openOfClose: '',
      dialogVisible: false,
      appList: {
        created_at: '',
        device_code: '',
        device_band: '',
        device_no: '',
        status: ''
      },
      appLoading: false,
      visible: false,
      appTotal: 0
    }
  },
  mounted () {
    this.getContact()
  },
  methods: {
    // 状态 开启 关闭
    change (row) {
      row.status === 1 ? row.status = 0 : row.status = 1
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
    // 重置
    refresh () {
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
      await axios.get('/auth/supervise/device/index', {
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
    // 添加
    async appDevice () {
      const accessToken = window.localStorage.getItem('access_token')
      const Token = window.localStorage.getItem('Token')
      await axios.post('auth/supervise/device/save', this.addInput, {
        headers: {
          Authorization: `Bearer ${Token}`,
          'x-api-header': 'yuanxibing',
          'x-access-token': accessToken
        }
      }).then(res => {
        console.log(res)
        if (res.data.code === 200) {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.getContact()
        } else {
          this.$message({
            message: res.data.message,
            type: 'warning'
          })
          this.getContact()
        }
      })
    },
    // 删除
    handleSelectionChange (val) {
      this.multipleSelection = val.map(i => {
        return i.id
      })
      this.disabled = false
    },
    delIndexDialog () {
      this.delDialogVisibleIndex = true
    },
    delIndex () {
      axios.delete('auth/supervise/device/delete/' + this.multipleSelection, {
        headers: {
          Authorization: `Bearer ${this.Token}`,
          'x-api-header': 'yuanxibing',
          'x-access-token': this.accessToken
        }
      }).then(res => {
        this.getContact()
      })
    },
    delDialog (e) {
      this.id = e.id
      this.delDialogVisible = true
    },
    async deleteApp () {
      await axios.delete('auth/supervise/device/delete/' + this.id, {
        headers: {
          Authorization: `Bearer ${this.Token}`,
          'x-api-header': 'yuanxibing',
          'x-access-token': this.accessToken
        }
      }).then(res => {
        this.getContact()
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
