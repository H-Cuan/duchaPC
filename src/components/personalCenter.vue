<template>
<div class="container">
  <div class="header">
    <div>
      <h1>上传头像:</h1>
      <div style="margin-top: 30px;">
        <el-upload
        action="#"
        list-type="picture-card"
        :auto-upload="false">
        <i slot="default" class="el-icon-plus"></i>
        <div slot="file" slot-scope="{file}">
          <img
            class="el-upload-list__item-thumbnail"
            :src="file.url" alt=""
          >
          <span class="el-upload-list__item-actions">
        <span
          class="el-upload-list__item-preview"
          @click="handlePictureCardPreview(file)"
        >
          <i class="el-icon-zoom-in"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleDownload(file)"
        >
          <i class="el-icon-download"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleRemove(file)"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
        </div>
      </el-upload>
        <span style="margin-left: 35px">上传头像</span>
      </div>
      <div style="color: #cccccc;font-size: 14px;margin-top: 20px">建议上传图片尺寸为60px*60pX,若不设置则使用系统默认</div>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </div>
  </div>
  <div style="margin: 30px 0 0 30px;width: 500px">
    <div style="display: flex;align-items: center">
      <h1 style="margin-left: 2em">昵称:</h1>
      <el-input placeholder="请输入昵称" style="width: 300px;margin-left: 10px"></el-input>
    </div>
    <div style="display: flex;align-items: center;margin-top: 20px">
      <h1>身份证号:</h1>
      <el-input placeholder="请输入身份证号" style="width: 300px;margin-left: 10px"></el-input>
    </div>
    <div style="display: flex;align-items: center;margin-top: 20px">
      <h1>警员编号:</h1>
      <el-input placeholder="请输入警员编号" style="width: 300px;margin-left: 10px"></el-input>
    </div>
    <div style="display: flex;align-items: center;margin-top: 20px">
      <h1 style="margin-left: 2em">单位:</h1>
      <el-select style="width: 300px;margin-left: 10px" v-model="value" placeholder="请选择单位">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div style="display: flex;align-items: center;margin-top: 20px">
      <h1 style="margin-left: 2em">岗位:</h1>
      <el-select style="width: 300px;margin-left: 10px" v-model="value" placeholder="请选择岗位">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
  </div>
  <div style="margin: 30px 0 0 270px">
    <el-button style="background: #e6effa;color: #5086ff">取消</el-button>
    <el-button style="background: #5086ff;color: #fff">保存</el-button>
  </div>
</div>
</template>

<script>
export default {
  name: 'personalCenter',
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false
    }
  },
  methods: {
    handleRemove (file) {
      console.log(file)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleDownload (file) {
      console.log(file)
    }
  }
}
</script>

<style scoped>
.container{
  background: #fff;
  height: 95%;
  width: 100%;
  border-radius: 15px;
  padding-top: 30px;
}
.header{
margin-left: 30px;
  width: 500px;
}
</style>
