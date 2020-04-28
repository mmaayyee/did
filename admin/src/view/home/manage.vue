<template>
    <section class="manage">
        <h1>管理员列表</h1>
        
        <div class="increase">
          <span>列表管理</span>
            <el-button type="primary" @click="adduser">添加用户</el-button>
        </div>
        <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
            header-align="center"
            align="center"
            prop="username"
            label="用户名"
            min-width="120">
        </el-table-column>
        <el-table-column
            header-align="center"
            align="center"
            label="角色"
            min-width="120">
            <template slot-scope="scope">
                <span  v-for="item in scope.row.roleList">
                  {{item.roleName}}
                </span>
              </template>
        </el-table-column>
        <el-table-column
            header-align="center"
            align="center"
            min-width="120"
            label="状态">
               <template slot-scope="scope">
                <span v-if="scope.row.state==1">
                  启动
                </span>
                <span v-else>
                    未启动
                </span>
              </template>
        </el-table-column>
        <el-table-column
            header-align="center"
            align="center"
            label="创建时间"
            min-width="120">
            <template slot-scope="scope">
                <span v-if="scope.row.createdAt">
                    {{scope.row.createdAt.split(" ")[0]}}
                </span>
                <span v-else>
                    暂无
                </span>
              </template>
        </el-table-column>
        <el-table-column
            header-align="center"
            align="center"
            label="更新时间"
            min-width="120">
              <template slot-scope="scope">
                <span v-if="scope.row.updatedAt">
                    {{scope.row.updatedAt.split(" ")[0]}}
                </span>
                <span v-else>
                    暂无
                </span>
              </template>
        </el-table-column>
        <el-table-column
            header-align="center"
            align="center"
            prop="date"
            label="操作"
            min-width="120">
             <template slot-scope="scope">
                <div>
                  <el-button type="text"  @click="deleteone(scope)">删除</el-button>
                  <el-button type="text"  @click="updateone(scope)">修改</el-button>
                </div>
              </template>
        </el-table-column>
        </el-table>

        <div class="block">
          <el-pagination @current-change="handleCurrentChange" @size-change="handleSizeChange" style="float: right;" :current-page="currentPage" :page-sizes="[5,10,15,20]" :page-size="pageSize" layout="prev,pager,next, jumper, total, sizes" :total="total"></el-pagination>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
          tableData: [],
          currentPage: 1, // 默认开始页码
          pageSize: 10, // 每页显示条数
          total: null,
        }
      },
      methods:{
        // 列表
        getdata(){
          this.$http.listmessage({
              sort:'createdAt',
              order:'asc',
              offset:'0',
              limit:'20',
          }).then(res=>{
            console.log(res)
              if(res.data.code==200){
                this.tableData=res.data.data.pageInfo.list
              }
          })
        },
        //新增
        adduser(){
          this.$router.push({
                    path: 'adduser',
                })
        },
        //删除
        deleteone(scope){
          this.$confirm('此操作将永久删除该, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.deleteadmin({
             ids: scope.row.id,
          }).then(res=>{
              if(res.data.code==200){
                this.getdata()
              }
          })
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
          
        },
        // 修改
        updateone(scope){
          
           this.$router.push({name: 'updateuser',query:{insId:scope.row.id}})
        },
         handleCurrentChange(val) {
          this.currentPage = val;
          this.getdata();
        },
         handleSizeChange(val) {
          this.pageSize = val;
          this.getdata();
        },
      },
      mounted(){
        this.getdata()
      }
      
 
}
</script>

<style>
.manage{
    width: 100%;
    /* padding: 20px; */

}
.increase{
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
}
h1{
  /* background: blanchedalmond; */
  text-align: center;
  padding: 10px;
  border-radius: 2px;
}
</style>
