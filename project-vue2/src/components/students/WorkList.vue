<template>
  <div class="workList">
    <el-table :data="tableData" v-loading="loading" border style="width: 100%">
      <el-table-column prop="id" label="用户ID" align="center">
      </el-table-column>
      <el-table-column prop="userId" label="所属班级" align="center">
      </el-table-column>
      <el-table-column prop="title" label="作业名称" align="center">
      </el-table-column>
      <el-table-column prop="completed_text" label="完成情况" align="center">
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[5, 10, 20, 50, 100]"
      :page-size="size"
      layout="total,sizes,prev,pager,next,jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getTableData } from "@/utils/table.js";
export default {
  data() {
    return {
      tableData: [],
      loading: true,
    };
  },
  created() {
    getTableData(this, "/works", {}, ["completed"]);
  },
  methods: {
    handleSizeChange(val) {
      this.size = val;
      this.page = 1;
      getTableData(this, "/works", {}, ["completed"]);
    },
    handleCurrentChange(val) {
      this.page = val;
      getTableData(this, "/works", {}, ["completed"]);
    },
  },
};
</script>
<style lang="scss">
.workList {
  .el-pagination {
    text-align: left;
    margin-top: 20px;
  }
}
</style>
