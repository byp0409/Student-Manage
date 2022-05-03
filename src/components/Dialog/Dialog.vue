<template>
  <div class="dialog">
    <el-dialog title="修改信息" :visible.sync="centerDialogVisible" width="30%" center>
      <el-form label-position="right" label-width="80px" :model="tableData">
        <!-- 学号禁止任何人修改 -->
        <el-form-item label="学号：">
          <span>{{ tableData.Sno }}</span>
        </el-form-item>
        <el-form-item label="姓名：">
          <el-input v-model="tableData.Sname" v-if="show == 1"></el-input>
          <span v-else>{{ tableData.Sname }}</span>
        </el-form-item>
        <el-form-item label="性别：">
          <el-input v-model="tableData.Ssex" v-if="show == 1"></el-input>
          <span v-else>{{ tableData.Ssex }}</span>
        </el-form-item>
        <!-- 普通用户只能修改下面的信息 -->
        <el-form-item label="年龄：">
          <el-input v-model="tableData.Sage"></el-input>
        </el-form-item>
        <el-form-item label="电话号：">
          <el-input v-model="tableData.Stel"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit">修 改</el-button>
        <el-button @click="centerDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { identity, token } from '@/util';
export default {
  name: 'Dialog',
  data() {
    return {
      centerDialogVisible: false,
      // 用户信息
      tableData: {},
      // 根据权限控制显示和隐藏
      show: '',
    };
  },
  methods: {
    submit() {
      // 解析权限
      this.tableData.identity = identity(token('stx_TOKEN'));
      // console.log(this.tableData);
      // 更新用户信息
      this.$store.dispatch('info/updateInfo', this.tableData).then(value => {
        this.$message(
          {
            message: '恭喜你，修改成功',
            center: true,
            type: 'success',
          },
          error => {
            this.$message({
              message: '修改失败',
              center: true,
              type: 'error',
            });
          }
        );
        this.centerDialogVisible = false;
      });
    },
  },
  mounted() {
    this.show = identity(token('stx_TOKEN'));
  },
};
</script>

<style></style>
