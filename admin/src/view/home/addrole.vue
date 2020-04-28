<template>
    <div class="loginPage">
        <el-card class="usercard">
            <h1>角色添加</h1>
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="角色名称">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="角色说明">
                    <el-input v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item label="是否启用">
                    <el-select v-model="form.state" placeholder="">
                        <el-option label="是" value="1"></el-option>
                        <el-option label="否" value="0"></el-option>
                    </el-select>
                </el-form-item>
                  <el-form-item>
                        <el-button type="primary" @click="addrole">提交</el-button>
                    </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>

    export default {
        name:"login",
        data() {
            return {
                form: {
                username: '',
                password:'',
                state:'',
                type:[],
                arrlist:[]
                }
            }
        },
        methods:{
            dateFormat:function(time) {
		var date=new Date(time);
		var year=date.getFullYear();
		/* 在日期格式中，月份是从0开始的，因此要加0
		 * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
		 * */
		var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
		var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
		var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
		var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
		var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
		// 拼接
		return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
	},

            //新增
            addrole(){
                this.$http.addrole({
                    "createdAt": this.dateFormat(new Date()),
                    "updatedAt":  this.dateFormat(new Date()),
                    "roleName": this.form.username,
                    "roleDesc": this.form.password,
                    "enable": this.form.state,
                }).then(res=>{
                    console.log(res)
                    if(res.data.code==200){
                        this.$router.push({
                            path: 'role',
                        })
                    }else{
                        alert('添加失败')
                    }
                })  
            },
            update(){
                this.$http.adminfrom({
                }).then(res=>{
                    console.log(res.data.data.roleLists)
                    this.form.arrlist=res.data.data.roleLists
                    console.log(this.form.arrlist)
                })
            }
        
        },
        mounted(){
            this.update()
        }
    }
</script>
<style>
.usercard
{
    width: 500px;
    margin: 20px auto;

}
</style>