<template>
  <el-dialog title="发布知识点" :visible.sync="centerDialogVisible" width="30%" center>
    <div class="input">
      <el-form
        :model="dynamicValidateForm"
        ref="dynamicValidateForm"
        label-width="100px"
        class="demo-dynamic"
        label-position="right"
        hide-required-asterisk
      >
        <el-form-item
          v-for="(domain, index) in dynamicValidateForm.domains"
          :label="'知识点' + index"
          :key="domain.key"
          :prop="'domains.' + index + '.value'"
          :rules="{
            required: true,
            message: '发布知识点不能为空',
            trigger: 'blur',
          }"
        >
          <el-input v-model="domain.value"></el-input>
          <el-button @click.prevent="removeDomain(domain)">删除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('dynamicValidateForm')">发布</el-button>
          <el-button @click="addDomain">添加知识点</el-button>
          <el-button @click="resetForm('dynamicValidateForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Dialog',
  data() {
    return {
      centerDialogVisible: false,
      // 表单内容
      dynamicValidateForm: {
        domains: [],
      },
    };
  },
  methods: {
    // 提交  改这
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        let formdata = this.dynamicValidateForm.domains;
        if (valid && formdata.length > 0) {
          let temp = [];
          formdata.forEach(item => {
            temp.push(item.value);
          });
          let string = temp.toString();
          let knowledge = string.replace(/,/g, '|');
          // 发请求
          this.$store.dispatch('home/releaseK', { knowledge }).then(
            value => {
              this.$message({
                message: '发布成功',
                type: 'success',
                center: 'true',
              });
              // 更新需要掌握的知识点
              this.$store.dispatch('home/getK', { Sno: this.pinfo.Sno });
              // 清空表单，关闭弹窗，解析页面
              this.centerDialogVisible = false;
              this.$refs[formName].resetFields();
            },
            error => {
              this.$message({
                message: '发布失败',
                type: 'error',
                center: 'true',
              });
            }
          );
        } else {
          this.$message({
            message: '请把信息填完整',
            type: 'warning',
            center: 'true',
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.centerDialogVisible = false;
    },
    // 移除
    removeDomain(item) {
      var index = this.dynamicValidateForm.domains.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1);
      }
    },
    // 添加
    addDomain() {
      this.dynamicValidateForm.domains.push({
        value: '',
        key: Date.now(),
      });
    },
  },
  computed: {
    ...mapState('info', ['pinfo']),
  },
};
</script>

<style></style>
