<template>
  <div class="studentList">
    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
      <el-form-item label="姓名">
        <el-input v-model="formInline.name" placeholder="请输入姓名查询"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="find">查询</el-button>        
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="compData" style="width: 100%">
      <el-table-column
        prop="name"
        label="姓名"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="sex_text"
        label="性别"
        align="center"
      ></el-table-column>
      <el-table-column prop="age" label="年龄" align="center"></el-table-column>
      <el-table-column
        prop="number"
        label="学号"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="class"
        label="班级"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="state_text"
        label="状态"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="phone"
        label="联系方式"
        align="center"
      ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="del(scope.row)"
          >
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import { students_list, students_delete } from "@/api/api";
export default {
  data() {
    return {
      tableData: [],
      currentPage: 1, // 当前页数
      pageSize: 10, // 每页显示条数
      total: 0, // 总页数
      formInline:{
        name:'',
      }
    };
  },
  created() {
    this.getData();
  },
  computed: {
    compData() {
      return this.tableData.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    },
  },
  methods: {
    find(){
      this.getData(this.formInline)
    },
    reset(){
      this.formInline = {}
      this.getData(this.formInline)
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.currentPage = 1;
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    getData(params) {
      students_list(params).then((res) => {
        // console.log(res)
        this.total = res.data.total;
        if (res.data.status === 200) {
          this.tableData = res.data.data;
          this.tableData.forEach((item) => {
            item.sex === 1 ? (item.sex_text = "男") : (item.sex_text = "女");
            item.state === "1"
              ? (item.state_text = "已入学")
              : item.state === "2"
              ? (item.state_text = "未入学")
              : (item.state_text = "休学中");
          });
        }
      });
    },
    del(row) {
      students_delete(row.id).then((res) => {
        if (res.data.status === 200) {
          console.log(res);
          this.$message({ message: "删除数据成功", type: "success" });
          this.getData();
        }
      });
    },
  },
};
</script>
<style lang="scss">
.studentList {
  .demo-form-inline, .el-form-item{
    margin-top:10px;
    margin-left:10px;
    text-align:left;
  }
  .el-pagination {
    text-align: center;
    margin-top: 20px;
  }
}
</style>
