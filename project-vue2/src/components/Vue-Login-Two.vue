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
import { setToken } from '@/utils/setToken'
import { login } from '@/api/api.js'
export default {
    data(){
        const validateName = (rule, value, callback) => {
            let reg = /(^[a-zA-Z0-9]{4,10}$)/;
            if(value === ''){
                callback(new Error('请输入用户名'));
            }else if(!reg.test(value)){
                callback(new Error('请输入4-10位用户名'));
            }else {
                callback();
            }
        }
        const validatePass = (rule, value, callback) => {
            let reg = /^\S*(?=\S{6,12})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/;
            if(value === ''){
                callback(new Error('请输入密码'));
            }else if(!reg.test(value)){
                callback(new Error('6-12位密码需要包含大小写字母和数字及特殊符号'));
            }else {
                callback();
            }
        }
        return {
            form:{
                username:'',
                password:''
            },
            rules:{
                username:[{validator:validateName, trigger:['blur','change']}],
                password:[{validator:validatePass, trigger:['blur','change']}]
            }
        }
    },
    methods:{
        login(form){
            this.$refs[form].validate((valid)=>{
                if(valid){
                    // this.service.post('/login',this.form)
                    // .then(res=>{
                    //     if(res.data.status === 200){
                    //         setToken('username',res.data.username)
                    //         setToken('token', res.data.token)
                    //         this.$message({message:res.data.message,type:'success'})
                    //         this.$router.push('/home')
                    //     }
                    //     console.log(res)
                    // })
                    login(this.form).then(res=>{
                        // console.log(res)
                        if(res.data.status === 200){
                            setToken('username',res.data.username)
                            setToken('token', res.data.token)
                            this.$message({message:res.data.message,type:'success'})
                            this.$router.push('/home')
                        }
                        console.log(res)
                    })
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
    // background:url('../assets/404.jpg') center no-repeat; 
    .el-card{
        background: #65768557;
    }
    .box-card{
        width:450px;
        margin:200px auto;
        color:#fff;
        .el-form .el-form-item__label{
            width:100px;
            color:#fff;
        }
        .el-card__header{
            font-size:34px;
        }
        .el-button{
            width:100%;
        }
    }
}
</style>