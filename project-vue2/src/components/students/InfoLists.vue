<template>
    <div class="infoMenu">
      <el-form
        :inline="true"
        class="demo-form-inline"
        size="small"
      >
        <el-form-item>
          <el-button type="primary" @click="addStudent">新增</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column
          prop="name"
          label="姓名"
          align="center"
        ></el-table-column>
        <el-table-column prop="sex" label="性别" align="center"></el-table-column>
        <el-table-column prop="age" label="年龄" align="center"></el-table-column>
        <el-table-column
          prop="father"
          label="父亲"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="mather"
          label="母亲"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="家庭住址"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="time"
          label="入校时间"
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
              icon="el-icon-edit"
              @click="edit(scope.row)"
            >
            </el-button>
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
      <el-dialog
        :title="state ? '添加学生信息' : '修改学生信息'"
        :visible.sync="dialogFormVisible"
        width="500px"
      >
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
            <el-radio v-model="form.sex" label="1">男</el-radio>
            <el-radio v-model="form.sex" label="2">女</el-radio>
          </el-form-item>
          <el-form-item label="年龄" :label-width="formLabelWidth" prop="age">
            <el-input v-model="form.age" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="父亲姓名"
            :label-width="formLabelWidth"
            prop="father"
          >
            <el-input v-model="form.father" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="母亲姓名"
            :label-width="formLabelWidth"
            prop="mather"
          >
            <el-input v-model="form.mather" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="家庭住址"
            :label-width="formLabelWidth"
            prop="address"
          >
            <el-input v-model="form.address" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="入学时间"
            :label-width="formLabelWidth"
            prop="time"
          >
            <el-date-picker
              v-model="form.time"
              format="yyyy年 MM月 dd日"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item
            label="联系方式"
            :label-width="formLabelWidth"
            prop="phone"
          >
            <el-input v-model="form.phone" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeInfo('form')">取 消</el-button>
          <el-button type="primary" @click="sure('form')">确 定</el-button>
          <!-- form -> 'form' -->
        </div>
      </el-dialog>
    </div>
  </template>
  <script>
  import { changeInfo,getData,delData } from '@/utils/table.js'
  export default {
    data() {
      return {
        tableData: [],
        dialogFormVisible: false,
        form: {
          name: "",
          sex: "1", // 默认选中
          age: "",
          father: "",
          mather: "",
          address: "",
          time: "",
          phone: "",
        },
        total: 0,
        formLabelWidth: "80px",
        rules: {
          name: [{ required: true, message: "请输入姓名" }],
          sex: [{ required: true }],
          age: [{ required: true, message: "请输入年龄" }],
          address: [{ required: true, message: "请输入地址" }],
          time: [{ required: true, message: "请输入入学时间" }],
          phone: [{ required: true, message: "请输入联系方式" }],
        },
        state:true
      };
    },
    created() {
      getData(this, '/info');
    },
    methods: {
      closeInfo(form){
        console.log(form)
        this.$refs[form].resetFields()
        this.dialogFormVisible = false
      },
      edit(row) {
        this.form = {...row}
        this.state = false
        this.dialogFormVisible = true
      },
      del(row) {
        delData(this, '/info', row.id, getData)
      },
      addStudent() {
        this.form = {
          name: "",
          sex: "1", // 默认选中
          age: "",
          father: "",
          mather: "",
          address: "",
          time: "",
          phone: "",
        },
        this.state = true
        this.dialogFormVisible = true;
      },
      sure(form) {
        this.$refs[form].validate(valid => {
          if (valid) {
            let methods = ''
            this.state ? methods = 'post' : methods = 'put'
            changeInfo(this,methods,'/info',this.form,getData)
          }
        });
      },
    },
  };
  </script>
  <style lang="scss">
  .infoMenu {
    .demo-form-inline,
    .el-form-item {
      margin-top: 10px;
      margin-left: 10px;
      text-align: left;
    }
  }
  </style>
  