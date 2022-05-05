<template>
  <div class="leftNav">
    <el-row class="tac">
      <el-col>
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          background-color="#304159"
          text-color="#fff"
          active-text-color="#289aff"
          router
          :collapse="iscollapse"
        >
          <el-menu-item index="/xxxx" class="title">
            <span>学生管理系统</span>
          </el-menu-item>
          <el-menu-item index="/home/homepage">
            <i class="el-icon-s-home"></i>
            <span slot="title">主页</span>
          </el-menu-item>
          <el-menu-item index="/home/studentInfo" v-if="identity == 1">
            <i class="el-icon-info"></i>
            <span slot="title">学生信息</span>
          </el-menu-item>
          <el-menu-item index="/home/register" v-if="identity == 1">
            <i class="el-icon-circle-plus"></i>
            <span slot="title">注册账户</span>
          </el-menu-item>
          <el-menu-item index="/home/myInfo">
            <i class="el-icon-user-solid"></i>
            <span slot="title">个人中心</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { account, identity, token } from '@/util';
export default {
  name: 'LeftNav',
  data() {
    return {
      // 控制导航栏伸缩
      iscollapse: false,
    };
  },
  mounted() {
    // 接收伸缩导航栏的信号
    this.$bus.$on('changeCollapse', value => {
      this.iscollapse = value;
    });
  },
  computed: {
    identity() {
      return identity(token('stx_TOKEN'));
    },
  },
};
</script>

<style lang="less" scoped>
.leftNav {
  position: fixed;
  top: 0;
  bottom: 0;
  // 让导航撑开
  // width: 200px;
  background-color: #304159;

  .el-menu {
    border-right-width: 0;
    .title {
      font-size: 17px;
      color: #fff;
      cursor: default !important;
      pointer-events: none;
    }
    // 调整激活时背景颜色
    .el-menu-item.is-active {
      background-color: #004079 !important;
    }
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
}
</style>
