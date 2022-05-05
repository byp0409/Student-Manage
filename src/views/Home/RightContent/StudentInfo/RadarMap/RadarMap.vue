<template>
  <div class="map">
    <div id="radarmap" style="width: 500px; height: 500px"></div>
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
      this.$Chart.radar('radarmap');
    });
  },
};
</script>

<style lang="less" scoped>
.map {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-25%, -50%);
  width: 600px;
  height: 600px;
  background-color: #333;
}
</style>
