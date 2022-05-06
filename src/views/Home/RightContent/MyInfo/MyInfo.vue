<template>
  <div class="myinfo">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="top">
      <el-breadcrumb-item :to="{ path: '/home/homepage' }">主页</el-breadcrumb-item>
      <el-breadcrumb-item>个人中心</el-breadcrumb-item>
    </el-breadcrumb>
    <span class="title">个人信息</span>
    <el-descriptions class="margin-top" :column="3" border>
      <el-descriptions-item>
        <template slot="label">
          <i class="icon-user-tie"></i>
          学号
        </template>
        {{ pinfo.Sno }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="icon-profile"></i>
          备注
        </template>
        <el-tag size="small">{{ identity }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="icon-user"></i>
          姓名
        </template>
        {{ pinfo.Sname }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="icon-phone"></i>
          手机号
        </template>
        {{ pinfo.Stel }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="icon-man-woman"></i>
          性别
        </template>
        {{ pinfo.Ssex }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="icon-eye-blocked"></i>
          年龄
        </template>
        {{ pinfo.Sage }}
      </el-descriptions-item>
    </el-descriptions>
    <!-- 修改信息 -->
    <div class="updata">
      <el-button type="primary" icon="el-icon-edit" @click="edit">编辑信息</el-button>
      <el-button type="danger" icon="icon-quill" @click="Modify">修改密码</el-button>
    </div>
    <!-- 弹窗 -->
    <Dialog ref="dialog" />
    <PassWord ref="password" />
  </div>
</template>

<script>
import { account, identity, token } from '@/util';
import { mapState } from 'vuex';
import Dialog from '@/components/Dialog/Dialog.vue';
import PassWord from './PassWord/PassWord';
export default {
  name: 'MyInfo',
  methods: {
    // 编辑信息
    edit() {
      this.$refs.dialog.centerDialogVisible = true;
      // 追加身份,控制修改权限
      this.pinfo.identity = identity(token('stx_TOKEN'));
      this.$refs.dialog.tableData = this.pinfo;
    },
    // 修改密码
    Modify() {
      this.$refs.password.centerDialogVisible = true;
    },
  },
  computed: {
    ...mapState('info', ['pinfo']),
    identity() {
      return identity(token('stx_TOKEN')) == 1 ? '管理员' : '学生';
    },
  },
  components: {
    Dialog,
    PassWord,
  },
  mounted() {
    // 获取个人信息
    this.$store.dispatch('info/reqPersonInfo', account(token('stx_TOKEN')));
  },
};
</script>

<style lang="less" scoped>
.myinfo {
  padding: 20px 15px;
  .top {
    margin-bottom: 17px;
  }
  .title {
    font-size: 16px;
    font-weight: 700;
  }
  .margin-top {
    margin-top: 15px;
  }
  .updata {
    margin-top: 25px;
    text-align: center;
  }
}
</style>
