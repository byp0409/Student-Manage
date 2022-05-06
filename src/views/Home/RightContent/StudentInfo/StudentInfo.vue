<template>
  <div class="table">
    <!-- 顶部导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="top">
      <el-breadcrumb-item :to="{ path: '/home/homepage' }">主页</el-breadcrumb-item>
      <el-breadcrumb-item>学生信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table :data="tableData" style="width: 100%; border-radius: 10px">
      <el-table-column label="ID" prop="id"></el-table-column>
      <el-table-column label="学号" prop="Sno"></el-table-column>
      <el-table-column label="名字" prop="Sname"></el-table-column>
      <el-table-column label="性别" prop="Ssex"></el-table-column>
      <el-table-column label="年龄" prop="Sage"></el-table-column>
      <el-table-column label="电话号" prop="Stel"></el-table-column>
      <el-table-column label="操作 " header-align="center" width="225px">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="check(scope.row)">查看</el-button>
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹窗 -->
    <Dialog ref="dialog" />
  </div>
</template>

<script>
import Dialog from '@/components/Dialog/Dialog.vue';
import { mapState } from 'vuex';
export default {
  name: 'StudentInfo',
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    // 查看
    check(row) {
      if (row.Scase1 !== null) {
        // 有数据允许跳转
        let { Sname, Sno, Scase, Scase1 } = row;
        this.$router.replace({ name: 'radarmap', query: { Sname, Sno, Scase, Scase1 } });
      } else {
        // 没有数据禁止跳转
        this.$message({
          showClose: true,
          message: '该用户暂未填写知识点掌握情况',
          type: 'warning',
          center: 'true',
        });
      }
    },
    // 编辑
    handleEdit(index, row) {
      //  展示弹窗
      this.$refs.dialog.centerDialogVisible = true;
      this.$refs.dialog.tableData = row;
    },
    // 删除
    handleDelete(row) {
      // console.log(index, row);
      let Sno = row.Sno;
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
      })
        .then(() => {
          this.$store.dispatch('info/deleteinfo', Sno).then(
            value => {
              this.$message({
                type: 'success',
                message: '删除成功!',
                center: true,
              });
              // 更新页面
              this.reqinfo();
            },
            error => {
              this.$message({
                type: 'error',
                message: '删除失败!',
                center: true,
              });
            }
          );
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
            center: true,
          });
        });
    },
    // 请求表格数据
    reqinfo() {
      this.$store.dispatch('info/reqinfo');
    },
  },
  computed: {
    ...mapState('info', ['info']),
  },
  watch: {
    // 更新表格数据
    info(info) {
      this.tableData = info;
      // console.log(info);
    },
  },
  mounted() {
    // 请求表格数据
    this.reqinfo();
  },
  components: {
    Dialog,
  },
};
</script>

<style lang="less" scoped>
.table {
  margin: 20px 15px;
  .top {
    margin-bottom: 16px;
  }
}
</style>
