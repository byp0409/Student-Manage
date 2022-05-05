<template>
  <!-- 主页面 -->
  <div>
    <LeftNav />
    <RightContent />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { token, account } from '@/util';
import LeftNav from '@/components/LeftNav/LeftNav.vue';
import RightContent from '@/views/Home/RightContent/RightContent.vue';
export default {
  name: 'Home',
  components: {
    LeftNav,
    RightContent,
  },
  mounted() {
    this.$store.dispatch('info/reqPersonInfo', account(token('stx_TOKEN'))).then(() => {
      // 初始化任务
      this.$store.dispatch('home/getK', { Sno: this.pinfo.Sno });
    });
  },
  computed: {
    ...mapState('info', ['pinfo']),
  },
};
</script>

<style></style>
