<template>
  <!-- 这是首页，不知道放哪的东西全放这 -->
  <div class="home">
    <!-- 日历 -->
    <Calendar class="cal" />
    <Task class="task" :class="{ active: iscollapse }" />
  </div>
</template>

<script>
import Calendar from '@/components/Calendar/Calendar.vue';
import Task from './Task/Task.vue';
export default {
  name: 'HomePage',
  data() {
    return {
      iscollapse: false,
    };
  },
  components: {
    Calendar,
    Task,
  },
  mounted() {
    // 接收伸缩导航栏的信号
    this.$bus.$on('changeCollapse', value => {
      this.iscollapse = value;
    });
  },
};
</script>

<style lang="less" scoped>
.home {
  position: relative;
  margin: 20px 15px;
  .cal {
    position: absolute;
    top: 0;
    right: 0;
  }
  .task {
    position: absolute;
    top: 0;
    left: 0;
    display: inline-block;
    width: 755px;
    transition: width 0.2s ease-in;
  }
  .active {
    width: 890px;
    transition: width 0.2s ease-in;
  }
}
</style>
