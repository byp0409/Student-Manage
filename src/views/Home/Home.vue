<template>
  <!-- 主页面 -->
  <div>
    <LeftNav />
    <RightContent />
  </div>
</template>

<script>
import LeftNav from '@/components/LeftNav/LeftNav.vue';
import RightContent from '@/views/Home/RightContent/RightContent.vue';
export default {
  name: 'Home',
  components: {
    LeftNav,
    RightContent,
  },
};
</script>

<style></style>
