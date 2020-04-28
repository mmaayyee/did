<template>
    <div class="loginPage">
        <el-card class="usercard">
            <h1>管理员修改</h1>
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="用户名">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.pass"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="form.state" placeholder="请选择活动区域">
                        <el-option label="正常" value="1"></el-option>
                        <el-option label="禁用" value="0"></el-option>
                    </el-select>
                </el-form-item>


                  <!-- <el-form-item>
                       <template> -->
                            <el-checkbox-group 
                                v-model="msy"
                                style="text-align:center"
                                >
                                <el-checkbox v-for="role in arrlist" :label="role.roleId" :key="role.roleId">{{role.roleName}}</el-checkbox>
                            </el-checkbox-group>
                        <!-- </template>
                    </el-form-item> -->
                  <el-form-item>
                        <el-button type="primary" @click="addadmin">提交</el-button>    
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
                arrlist:[],
                form: {
                    username: '',
                    pass:'',
                    state:'',
                    type:[],
                },
                msy:[]
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
            addadmin(){
                this.$http.addadmin({
                    "uid":this.$route.query.insId,
                    "createdAt": this.dateFormat(new Date()),
                    "updatedAt":  this.dateFormat(new Date()),
                    "isSystem": 0,
                    "username": this.form.username,
                    "password": this.form.pass,
                    "state": this.form.state,
                    "roleId": ["36f1dd1296674fc08484c5abf6a5806b"]
                }).then(res=>{
                    console.log(res)
                    if(res.data.code==200){
                        this.$router.push({
                            path: 'manage',
                        })
                    }else{
                        alert('添加失败')
                    }
                })  
            },
            update(){
                this.$http.adminfrom({
                    id: this.$route.query.insId,
                }).then(res=>{
                    console.log(res)
                    this.form=res.data.data.admin
                    console.log(this.form.state)
                    if(this.form.state=='1'){
                        this.form.state="正常"
                    }else if(this.form.state=='0'){
                        this.form.state="禁用"
                    }
                    this.arrlist=res.data.data.roleLists
                    console.log(this.form.arrlist)
                })
            },
 
        
        },
        mounted(){
            this.update()
            console.log(this.$route.query.insId)
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