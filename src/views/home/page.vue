<template>
  <div class="home">
      <el-container>
            <el-header>
                <img src="./img/logow.png" alt="">
                <el-dropdown trigger="hover">
                <span class="el-dropdown-link">
                    用户：{{username}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="getOut">退出登录</el-dropdown-item>
                    <el-dropdown-item @click.native="changePassword">更改密码</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>

  </div>
</template>

<script>
export default {
    name: "home",
    data(){
        return{
            username:sessionStorage.getItem("userName")||""
        }
    },
    components: {
    },
    created(){
        if(!sessionStorage.getItem("uuid")){
            sessionStorage.clear();
            this.$router.push("/login");
        }
    },
    methods: {
        handleOpen(key, keyPath) {
        console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
        console.log(key, keyPath);
        },
        getOut(){
            sessionStorage.clear()
            this.$router.push("/login")
        },
        changePassword(){
            this.$message('请联系管理员');
        }
    }
};
</script>
<style lang="scss" scoped>
.el-header{
    padding-left: 0;
}
.el-header img{
    float: left;
    height: 60px;
}
.el-dropdown{
    float: right;
}
.el-dropdown-link{
    color: white;
    cursor: pointer;
}
header{
    background-color: #2183D8;
    line-height: 60px;
    color: white;
}
.el-main{
    position: absolute;
    top: 60px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    padding: 15px;
    box-sizing: border-box;
    background-color: #EDEEF2;
}
</style>

