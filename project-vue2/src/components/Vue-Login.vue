<template>
    <div class="login">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>通用后台管理系统</span>
            </div>
            <el-form label-width="80px" :model="form" ref="form" :rules="rules">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
            <!-- <el-form-item label="用户名" prop="username"
            :rules="[
                {required:true, message:'请输入用户名', trigger:'blur'},
                {min:4, max:10, message:'长度在4-10位字符之间', trigger:'blur'}
            ]">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password"
            :rules="[
                {required:true, message:'请输入密码', trigger:'blur'},
                {min:6, max:12, message:'长度在6-12位字符之间', trigger:'blur'}
            ]"> -->
            <el-input type='password' v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="login('form')">登录</el-button>
        </el-form-item>
        </el-form>
        </el-card>
    </div>
</template>
<script>
// import { defineComponent } from '@vue/composition-api'

// export default defineComponent({
//     setup() {
        
//     },
// })
import {nameRule,passwordRule} from '../utils/validate.js'
import {setToken} from '@/utils/setToken.js'
export default {
    data(){
        return {
            form:{
                username:'',
                password:''
            },
            rules:{
                username:[{validator:nameRule, trigger:['blur','change']}],
                password:[{validator:passwordRule, trigger:['blur','change']}]
            }
        }
    },
    methods:{
        login(form){
            this.$refs[form].validate((valid)=>{
                if(valid){
                    console.log(this.form);
                    this.axios
                    .post("https://rapserver.sunmi.com/app/mock/340/login", this.form)
                    .then((res) => {
                        console.log(res);
                        if(res.data.status === 200){
                            // localStorge.setItem("username", res.data.username);
                            setToken("username", res.data.username);
                            this.$message({message:res.data.message, type:"success"});
                            this.$router.push("/home");
                        }
                    })
                    .catch((err) => {
                        console.error(err);
                    });
                }
                else{
                    console.log("fail")
                }
            })
        }
    }
}
</script>
<style lang="scss">
.login{
    width:100%;
    height:100%;
    position:absolute;
    background: #409EFF;
    .box-card{
        width:450px;
        margin:200px auto;
    }
}
</style>