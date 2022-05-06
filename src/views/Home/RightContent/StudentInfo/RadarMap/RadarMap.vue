<template>
  <div class="content">
    <!-- 顶部导航 -->
    <div class="top">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home/homepage' }">主页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/home/studentInfo' }">学生信息</el-breadcrumb-item>
        <el-breadcrumb-item>知识点掌握情况</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="map">
      <div id="radarmap" style="width: 500px; height: 500px"></div>
    </div>
    <!-- 未来要补充的东西 -->
    <div class="empty">
      <el-empty description="这里暂未施工完毕" :image-size="300"></el-empty>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RadarMap',
  data() {
    return {};
  },
  mounted() {
    // 渲染数据
    this.$nextTick(() => {
      let { Sno, Sname, Scase, Scase1 } = this.$route.query;
      this.$Chart.radar('radarmap', Sname, Scase, Scase1);
    });
  },
};
</script>

<style lang="less" scoped>
.content {
  position: relative;
  padding: 20px 15px;
  .top {
    padding-bottom: 14px;
    // background-color: #fff;
    border-radius: 5px;
  }
  .map {
    position: absolute;
    top: 125px;
    left: 200px;
    width: 500px;
    height: 500px;
    background-color: #fff;
  }
  .empty {
    position: absolute;
    width: 550px;
    height: 500px;
    background-color: #fff;
    margin-top: 50px;
    right: 50px;
    border-radius: 10px;
  }
}
</style>
