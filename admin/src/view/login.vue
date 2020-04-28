<template>
    <div class="loginPage">
        <div class="loginBox flexCenter" >
            <h2>后台管理系统</h2>
            <div class="flexBox w350">
                 <el-input
                    placeholder="请输入用户名"
                    v-model="admin"
                    :clearable="true">
                </el-input>
                <el-input
                    placeholder="请输入密码"
                    v-model="pass"
                    :clearable="true">
                </el-input>
                <el-button @click="login" type="primary">登陆</el-button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name:"login",
        data(){
            return {
                admin:"",
                pass:"",
            }
        },
        methods:{
            //登陆方法
            login(){
                this.$http.login({
                    username:this.admin,
                    password:this.pass
                }).then(res=>{
                    if(res.data.code==200){
                        let data = res.data.data;
                        console.log(data);
                        localStorage.admin_tokenID=data.token;
                        this.$router.push({
                            path:"/"
                        })
                    }else{
                        alert("登陆失败")
                    }
                    
                })
            }
        }
    }
</script>
<style>
*{
    margin: 0 ;
    padding: 0;
}
html,body{
    width: 100%;
    height: 100%;
}
.flexBox{
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: center
}
.w350{
    width: 350px;
}
.flexCenter{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
    .loginPage{
        height:100%;
        width:100%;
        position:relative;
    }
    .loginBox{
        position:absolute;
        width:500px;
        height:350px;
        box-shadow:2px 2px 5px black;
        top:500px;  
        left:0;
        bottom:0;
        right:0;
        margin:auto;
        background:floralwhite;
    }
    .loginBox h2{
        box-shadow:0px 2px 2px black;
        background:#409EFF;
        height:80px;
        color:white;
        width:100%;
        line-height:80px;
        text-indent:30px;
    }
</style>