<template>
  <div class="calendar">
    <!-- 日历 -->
    <el-calendar class="cal" v-model="value">
      <template slot="dateCell" slot-scope="{ date, data }">
        <p :class="data.isSelected ? 'is-selected' : ''">
          {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : '' }}
        </p>
      </template>
    </el-calendar>
    <!-- 展示知识点 -->
    <div class="tody" v-if="identity == 1">
      <div class="title">
        <span>发布本周需要掌握的知识点</span>
        <el-button
          type="warning"
          icon="el-icon-plus"
          circle
          class="button"
          @click="submit"
        ></el-button>
        <!-- 管理员展示的内容 -->
      </div>
      <div class="content">
        <div class="knowledge" v-for="(item, index) in knowledge" :key="index">
          <span>知识点{{ index + 1 }}：</span>
          <span>{{ item }}</span>
        </div>
      </div>
      <!-- 动态增加表单 -->
      <!-- 管理员发布需要掌握的的知识点 -->
    </div>
    <div class="tody" v-if="identity == 0">
      <div class="title">
        <span>知识点掌握情况</span>
      </div>
      <div class="rate" v-for="(item, index) in knowledge" :key="index">
        <span>{{ item }}：</span>
        <el-rate
          v-model="ratelist[index][`rate${index}`]"
          show-text
          :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
          :texts="['极差', '差', '中', '良', '优']"
        >
          :icon-classes="iconClasses" >
        </el-rate>
      </div>
      <div class="submit">
        <el-button type="success" icon="el-icon-check" circle @click="submitstu"></el-button>
      </div>
    </div>
    <!-- 输入 -->
    <Dialog ref="dia" />
  </div>
</template>

<script>
import { account, identity, token } from '@/util';
import { mapState } from 'vuex';
import Dialog from './Dialog/Dialog.vue';
export default {
  name: 'Calendar',
  data() {
    return {
      // 评分
      ratelist: [
        { rate0: null },
        { rate1: null },
        { rate2: null },
        { rate3: null },
        { rate4: null },
        { rate5: null },
        { rate6: null },
        { rate7: null },
      ],
      value: new Date(),
    };
  },
  computed: {
    ...mapState('home', ['knowledge', 'pinfo']),
    ...mapState('info', ['pinfo']),
    // 鉴权
    identity() {
      return identity(token('stx_TOKEN'));
    },
  },
  methods: {
    // 提交学习情况
    submitstu() {
      let list = '';
      this.ratelist.forEach((item, index) => {
        let temp1 = item[`rate${index}`];
        let temp2 = this.knowledge[index];
        if (temp1 !== null) {
          list = list.concat(`${temp2}:${temp1}|`);
        }
      });
      let params = { Sno: this.pinfo.Sno, Scase1: list };
      this.$API.updateK(params).then(result => {
        if (result.data.status == 200) {
          this.$message({
            message: '提交成功',
            type: 'success',
            center: 'true',
          });
        } else {
          this.$message({
            message: '提交失败',
            type: 'error',
          });
        }
      });
    },
    submit() {
      this.$refs.dia.centerDialogVisible = true;
    },
  },
  components: {
    Dialog,
  },
};
</script>

<style lang="less" scoped>
.cal {
  width: 520px;
}
.cal /deep/ .el-calendar-table .el-calendar-day {
  height: 50px;
}
.cal /deep/ .el-calendar__body {
  padding-bottom: 20px;
}
.tody {
  width: 520px;
  margin-top: 15px;
  background-color: #fff;
  padding: 7px 0;
  .title {
    display: flex;
    padding: 0 15px;
    justify-content: space-between;
    align-items: center;
    width: 510px;
    top: 12px;
    left: 22px;
    font-weight: 700;
  }
  .content {
    margin: 5px 14px;
    .knowledge {
      font-size: 15px;
      margin: 5px 0;
    }
  }
  .rate {
    display: flex;
    margin-top: 10px;
    margin-left: 15px;
  }
  .submit {
    text-align: center;
  }
}
</style>
