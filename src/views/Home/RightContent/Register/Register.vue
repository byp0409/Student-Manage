<template>
  <div class="form">
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
      <el-form-item label="姓名" prop="Sname">
        <el-input v-model="ruleForm.Sname"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="Ssex">
        <el-radio-group v-model="ruleForm.Ssex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="管理员" prop="identity">
        <el-switch v-model="ruleForm.identity"></el-switch>
      </el-form-item>
      <el-form-item label="年龄" prop="Sage">
        <el-input-number
          v-model="ruleForm.Sage"
          controls-position="right"
          @change="handleChange"
          :min="0"
          :max="180"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="电话号" prop="Stel">
        <el-input v-model.number="ruleForm.Stel"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { validatePhone } from '@/util';
export default {
  name: 'Register',
  data() {
    return {
      ruleForm: {
        Sno: '',
        Sname: '',
        Ssex: '男',
        identity: false,
        Sage: 18,
        Stel: '',
      },
      rules: {
        Sno: [
          { required: true, message: '请输入学号', trigger: 'change' },
          { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' },
        ],
        Sname: [{ required: true, message: '请输入姓名', trigger: 'change' }],
        Stel: [{ validator: validatePhone, trigger: 'blur' }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let userinfo = this.ruleForm;
          userinfo.identity == false ? (userinfo.identity = 0) : (userinfo.identity = 1);
          // 请求注册
          this.$API.register(userinfo).then(value => {
            if (value.data.status == 200) {
              this.$message({
                message: '恭喜你，注册成功',
                type: 'success',
                center: 'true',
              });
              this.$router.replace('/home/studentInfo');
            } else {
              this.$message({
                message: '注册失败，用户名已被占用',
                type: 'error',
                center: 'true',
              });
            }
          });
        } else {
          // 校验失败
          this.$message({
            message: '要把信息填完整哦',
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
    // 计数器
    handleChange(value) {
      this.ruleForm.Sage = value;
    },
  },
};
</script>

<style lang="less" scoped>
.form {
  margin: 20px 15px;
}
</style>
