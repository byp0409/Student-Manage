<template>
  <el-dialog title="修改密码" :visible.sync="centerDialogVisible" width="30%" center>
    <!-- 表单 -->
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      label-position="left"
      hide-required-asterisk
    >
      <el-form-item label="学号" prop="Sno">
        <el-input v-model="ruleForm.Sno"></el-input>
      </el-form-item>
      <el-form-item label="旧密码" prop="password">
        <el-input v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="newpassword">
        <el-input type="password" v-model="ruleForm.newpassword" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      <el-button @click="centerDialogVisible = false">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'PassWord',
  data() {
    // 密码校验规则
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.newpassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      // 开关弹窗
      centerDialogVisible: false,
      // 表单
      ruleForm: {
        Sno: '',
        password: '',
        newpassword: '',
        checkPass: '',
      },
      rules: {
        Sno: [{ required: true, message: '请输入学号', trigger: 'change' }],
        password: [{ required: true, message: '请输入旧密码', trigger: 'change' }],
        newpassword: [{ validator: validatePass, trigger: 'change' }],
        checkPass: [{ validator: validatePass2, trigger: 'change' }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 校验成功
          this.$API.modifyPassword(this.ruleForm).then(
            result => {
              // 修改成功
              if (result.data.status == 200) {
                this.$message({
                  message: '修改成功',
                  type: 'success',
                  center: 'true',
                });
                // 清空数据
                this.ruleForm = {};
                this.centerDialogVisible = false;
              } else {
                this.$message({
                  message: '输入信息错误',
                  type: 'error',
                  center: 'true',
                });
              }
            },
            error => {
              return false;
            }
          );
        } else {
          this.$message({
            message: '请按要求填完所有信息',
            type: 'warning',
            center: 'true',
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style></style>
