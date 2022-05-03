<template>
  <div class="topNav">
    <i @click="change" v-show="!flag" class="el-icon-s-fold"></i>
    <i @click="change" v-show="flag" class="el-icon-s-unfold"></i>
    <div class="right">
      <div class="user">
        <router-link to="/home/myInfo" style="color: #fff">欢迎用户：{{ pinfo.Sname }}</router-link>
      </div>
      <div class="logout el-icon-switch-button" @click="logout">注销</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'TopNav',
  props: ['changeflag'],
  data() {
    return {
      // 控制导航伸缩
      flag: false,
    };
  },
  methods: {
    // 退出登录
    logout() {
      // 没有退出登录的接口，只销毁token
      localStorage.removeItem('stx_TOKEN');
      this.$router.replace('/login');
    },
    // 切换导航栏状态
    change() {
      this.flag = !this.flag;
      this.$bus.$emit('changeCollapse', this.flag);
      this.changeflag(this.flag);
    },
  },
  computed: {
    ...mapState('info', ['pinfo']),
  },
};
</script>

<style lang="less" scoped>
.topNav {
  height: 50px;
  background-color: #1573c3;
  i {
    margin-top: 12px;
    font-size: 32px;
  }
  .right {
    display: flex;
    justify-content: flex-end;
    float: right;
    // width: 200;
    margin-right: 20px;
    line-height: 50px;
    .user {
      margin-right: 30px;
      font-size: 23px;
      cursor: default;
    }
    .logout {
      margin-right: 15px;
      line-height: 50px;
      color: #fff;
      font-size: 23px;
      cursor: pointer;
    }
  }
}
</style>
