<template>
    <div class="login">
        <el-header class="clear" height="auto">
            <img class="logo" src="./imgs/logob.png" alt="">
            <span>欢迎登陆</span>
        </el-header>
        <el-main>
            <div class="loginForm">
                <input placeholder="请输入用户名" type="text" class="username" v-model="username">
                <input placeholder="请输入密码" type="password" class="password" v-model="password">
                <button class="loginbtn" @click="loginFun"></button>
                <span class="changeLogin" @click="changeLogin()">切换平台端登陆</span>
                <!-- <button class="resbtn"></button> -->
            </div>
        </el-main>
        <el-footer></el-footer>
    </div>    
</template>
<script>
import {AccountLogin} from '../../api/sys.login.js'
import { Message } from 'element-ui';
export default {
    data(){
        return{
            username:'',
            password:'',
        }
    },
    methods:{
        changeLogin(){
            window.location.href = window.baseURL+"/pt/index.html#/login";
        },
        loginFun(){
            if(this.username && this.password){
                AccountLogin({
                    userName : this.username,
                    password : this.password,
                })
                .then(async res => {
                    if(res.code == "success"){
                        sessionStorage.setItem("userName",res.data.userName)
                        sessionStorage.setItem("uuid",res.data.uuid)
                        sessionStorage.setItem("token",res.data.token)
                        this.$router.push("/");
                    }
                
                })
                .catch(err => {
                    console.log("err: ", err);
                });
            }else{
                Message({
                    message:'用户名和密码不能为空'
                })
            }
            

        }
    },
    created(){
        var lett = this;
        document.onkeydown = function(e) {
            var key = window.event.keyCode;
            if (key == 13) {
            lett.loginFun();
            }
        }
    }
}
</script>
<style scoped>
.login{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow-x: auto;
}
.el-header{
    width: 1200px;
    margin: 0px auto;
    padding-top: 50px;
    text-align: right;
    position: relative;
}
.el-header .logo{
    float: left;
}
.el-header span{
    font-size: 18px;
    position: absolute;
    bottom: 20px;
    left: 90%;
}
.el-main{
    padding: 0;
    background: url("./imgs/loginbk.png") no-repeat center;
    background-size:auto 140%;
    margin: 0px auto;
    min-width: 1200px;
    height: 500px;
    position: relative
}
.loginForm{
    width: 400px;
    height: 360px;
    background: url("./imgs/login33_07.jpg") no-repeat center;
    background-size: 100%;
    position: absolute;
    left: 60%;
    top:60px;
    border-radius: 10px;
}
.loginForm input,.loginForm button{
    border: none;
    position: absolute;
    background-color: rgba(0,0,0,0);
    left: 110px;
    top: 20px;
    width: 240px;
    line-height: 48px;
    font-size: 13px;
    z-index: 10;
    padding-left:10px;
}
.loginForm .username{
    top:65px;
}
.loginForm .password{
    top:135px;
}
.loginForm button{
    cursor: pointer;
    width: 160px;
    height: 40px;
}
.loginForm .loginbtn{
    left: 120px;
    top: 225px;
}
.loginForm .resbtn{
    left: 120px;
    top: 284px;
}
.changeLogin{
    font-size: 14px;
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    cursor: pointer;
}
.changeLogin:hover{
    color: blue;
}
</style>


