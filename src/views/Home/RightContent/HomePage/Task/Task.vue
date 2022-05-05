<template>
  <div>
    <!-- 教师可以发布 -->
    <div class="teacher" v-if="identity == 1">
      <div class="title"><span>发布任务</span></div>
      <el-form :model="ruleForm" ref="ruleForm" class="demo-ruleForm" :rules="rules">
        <el-form-item prop="task">
          <el-input type="textarea" v-model="ruleForm.task"></el-input>
        </el-form-item>
        <div class="submit">
          <el-button type="primary" @click="onSubmit('ruleForm')">立即发布</el-button>
          <el-button @click="cancel('ruleForm')">重置</el-button>
        </div>
      </el-form>
    </div>
    <!-- 展示任务 -->
    <div class="title history">
      <span>历史任务</span>
    </div>
    <el-collapse v-model="activeNames" class="list" @change="handleChange" accordion>
      <el-collapse-item
        :title="`发布时间：${task.time}`"
        :name="task.tid"
        v-for="task in alltask"
        :key="task.tid"
      >
        <!-- 进度条 -->
        <div class="progress">
          <el-progress
            :text-inside="true"
            :stroke-width="20"
            :percentage="percent"
            style="width: 715px; margin: 10px 0"
          ></el-progress>
        </div>
        <div class="main">
          <!-- 内容 -->
          <div>{{ task.Tname }}</div>
          <!-- 发布的任务   管理员 -->
          <div class="content">
            <!-- 记住修改权限 -->
            <el-popconfirm
              confirm-button-text="是的"
              cancel-button-text="不用了"
              icon="el-icon-info"
              icon-color="red"
              title="确定删除吗？"
              @confirm="remove(task.tid)"
              v-if="identity == 1"
            >
              <el-button slot="reference" type="danger" icon="el-icon-delete" circle></el-button>
            </el-popconfirm>
            <!-- 记住修改权限 -->
            <el-button
              @click="confirm(task.tid)"
              slot="reference"
              type="success"
              icon="el-icon-check"
              circle
              v-if="finish && identity == 0"
            ></el-button>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { account, identity, token } from '@/util';
import { mapState, mapGetters } from 'vuex';
export default {
  name: 'Task',
  data() {
    return {
      // 完成任务
      finish: true,
      // 已展开的
      activeNames: '',
      // 百分比
      percent: 0,
      ruleForm: {
        task: '',
      },
      rules: {
        task: [{ required: true, message: '请填写内容', trigger: 'change' }],
      },
    };
  },
  methods: {
    // 学生确认完成
    confirm(tid) {
      // 解决思路，先判断用户是否完成，在handleChange进行判断，完成隐藏按钮，从解决重复完成问题  tid   completes
      this.$confirm('完成任务后将无法修改?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        // 整理数据 ,如果complete为空说明没人完成
        let completes = `{Sno:${this.pinfo.Sno}}`;
        if (this.complete.length > 0) {
          let temp = `|{Sno:${this.pinfo.Sno}}`;
          let newcompletes = this.complete.toString().replace(/,/g, '|').concat(temp);
          // 更新进度
          this.updatecomplete({ tid, completes: newcompletes });
        } else {
          // 更新进度
          this.updatecomplete({ tid, completes });
        }
      });
    },
    // 展开后计算完成进度
    handleChange(val) {
      // 置空state
      let data = [];
      this.$store.commit('home/GETCOMPLETE', data);
      // 收起时val为空，禁止请求
      if (val) {
        let params = { tid: val };
        // 请求完成度
        this.getcomplete(params);
      }
    },
    // 管理员删除
    remove(val) {
      this.$store.dispatch('home/deletetask', { tid: val }).then(
        () => {
          this.$message({
            message: '删除成功',
            type: 'success',
            center: true,
          });
          // 更新页面
          this.getstask();
        },
        error => {
          this.$message({
            message: '删除失败',
            type: 'error',
            center: true,
          });
        }
      );
    },
    // 提交
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = { Tname: this.ruleForm.task };
          this.$store.dispatch('home/getrelease', params).then(
            () => {
              this.$message({
                message: '发布成功',
                type: 'success',
                center: 'true',
              });
              // 清空
              this.$refs[formName].resetFields();
              // 更新页面
              this.getstask();
            },
            () => {
              this.$message({
                message: '发布失败',
                type: 'error',
                center: 'true',
              });
            }
          );
        } else {
          this.$message({
            message: '请填写要发布的任务',
            type: 'warning',
            center: 'true',
          });
          return false;
        }
      });
    },
    // 清空
    cancel(formName) {
      this.$refs[formName].resetFields();
    },
    // 更新完成情况封装
    updatecomplete(data) {
      // 直接插入整理的数据
      this.$store.dispatch('home/updatecomplete', data).then(() => {
        // 更新页面
        this.getstask();
        this.$message({
          type: 'success',
          message: '已完成任务',
          center: 'true',
        });
      });
    },
    // 请求完成情况封装
    getcomplete(params) {
      // 异步数据，确保请求成完成再计算
      this.$store.dispatch('home/getcomplete', params).then(
        () => {
          // 把响应的字符串变成数组
          let temp = this.complete;
          if (temp !== null) {
            // 计算百分比
            let total = this.taskdata.usertotal;
            let completetotal = temp.length;
            // 结果向上取整
            this.percent = Math.ceil((completetotal / total) * 100);
            // 实践后发现，这些内容放在请求数据里比较合适，因为所有操作最后都要更新数据  类似于全局后置守卫
            /* 判断是否要显示完成任务按钮   直接在更新状态时判断 */
            // var string = `{Sno:${this.pinfo.Sno}}`;
            // // 取反，有就不显示
            // this.finish = !temp.every(value => {
            //   return value == string;
            // });
            // 更新状态
            this.getstask();
          }
        },
        error => {
          // 请求失败，进度为空时置空百分比，修改按钮状态
          this.percent = 0;
          // 请求失败展示勾选按钮
          this.finish = true;
        }
      );
    },
    // 请求任务封装
    getstask() {
      this.$store.dispatch('home/gettask').then(() => {
        // 把响应的字符串变成数组
        let temp = this.complete;
        /* 判断是否要显示完成任务按钮 */
        var string = `{Sno:${this.pinfo.Sno}}`;
        // 取反，有就不显示
        this.finish = !temp.every(value => {
          return value == string;
        });
      });
    },
  },
  computed: {
    ...mapState('home', ['taskdata', 'complete']),
    ...mapGetters('home', ['alltask']),
    ...mapState('info', ['pinfo']),
    // 鉴权
    identity() {
      return identity(token('stx_TOKEN'));
    },
  },
  mounted() {
    // 初始化
    this.getstask();
  },
};
</script>

<style lang="less" scoped>
.title {
  margin-bottom: 7px;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
}
.submit {
  text-align: center;
}
.history {
  margin-top: 15px;
}
.list {
  margin-bottom: 20px;
  // 穿透修改列表样式
  .el-collapse-item /deep/ .el-collapse-item__header {
    padding-left: 20px;
    font-size: 15px;
  }
  .el-collapse-item /deep/ .el-collapse-item__content {
    font-size: 15px;
    padding: 5px 20px 5px 20px;
    background-color: rgba(52, 36, 36, 0.1);
  }
  .main {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .content {
      margin-left: 30px;
    }
  }
}
</style>
