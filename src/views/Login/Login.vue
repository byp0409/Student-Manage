<template>
  <div class="login">
    <!-- 登录组件 -->
    <div class="main">
      <div class="title">
        <span>登录</span>
      </div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
        show-message
        label-width="80px"
        :hide-required-asterisk="true"
      >
        <el-form-item
          label="账号"
          prop="Sno"
          class="change-label-calss"
          hide-required-asterisk="true"
        >
          <el-input v-model="ruleForm.Sno" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" class="change-label-calss">
          <el-input placeholder="请输入密码" v-model="ruleForm.password" show-password></el-input>
        </el-form-item>
      </el-form>
      <div class="button">
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      ruleForm: {
        Sno: '',
        password: '',
      },
      rules: {
        Sno: [{ required: true, message: '请输入账号', trigger: 'change' }],
        password: [{ required: true, message: '请输入密码', trigger: 'change' }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 整理数据
          let data = { Sno: this.ruleForm.Sno, password: this.ruleForm.password };
          // 请求登录
          this.$store.dispatch('login/login', data).then(
            value => {
              this.$message({
                message: '欢迎',
                type: 'success',
                center: 'true',
              });
              // 请求用户个人信息
              this.$store.dispatch('info/reqPersonInfo', data.Sno);
              this.$router.replace({ path: '/home/homepage' });
            },
            error => {
              this.$message({
                message: '登录失败，请检查账号和密码是否输入正确',
                type: 'warning',
                center: 'true',
              });
              this.$refs[formName].resetFields();
            }
          );
        } else {
          this.$message({
            message: '要把信息填完整哦',
            type: 'warning',
            center: 'true',
          });
          return false;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  // 设置登录背景
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: url(./images/background.jpg) no-repeat;
  background-size: 100% 100%;
  .main {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    height: 300px;
    background-color: rgba(234, 224, 224, 0.4);
    border-radius: 10px;
    .title {
      text-align: center;
      margin-top: 20px;
      font-size: 35px;
      font-weight: 700;
    }
    .demo-ruleForm {
      margin-right: 50px;
      margin-top: 25px;
      font-size: 20px;
      // 穿透修改组件样式
      .change-label-calss /deep/ .el-form-item__label {
        font-size: 20px;
        color: #333333;
      }
      .change-label-calss /deep/ .el-form-item__error {
        color: #fff;
      }
    }
    .button {
      text-align: center;
    }
  }
}
</style>
