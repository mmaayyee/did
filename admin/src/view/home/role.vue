<template>
    <section class="role">
        <h1>角色员列表</h1>
        
        <div class="increase">
          <span>列表管理</span>
            <el-button type="primary" @click="addrole">添加用户</el-button>
        </div>
        <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
            header-align="center"
            align="center"
            prop="roleName"
            label="角色名称"
            min-width="180">
        </el-table-column>
       <el-table-column
            header-align="center"
            align="center"
            prop="name"
            label="角色描述"
            min-width="250">
            <template slot-scope="scope">
                <span  v-for="item in scope.row.menuList">
                  {{item.menuName}}
                </span>
              </template>
        </el-table-column>
       <el-table-column
            header-align="center"
            align="center"
            min-width="180"
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
            min-width="180">
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
            min-width="180">
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
            min-width="180">
             <template slot-scope="scope">
                <div>
                  <el-button type="text"  @click="dialogTableVisible = true">授权</el-button>
                  <el-button type="text"  @click="updateone(scope)">修改</el-button>
                  <el-button type="text"  @click="deleteone(scope)">删除</el-button>
                </div>
              </template>
        </el-table-column>
        </el-table>



        <el-dialog title="角色授权" :visible.sync="dialogTableVisible">
            <el-tree
              :data="data4"
              :props="defaultProps"
              show-checkbox
              node-key="id"
              :expand-on-click-node="false"
              >
            </el-tree>

        </el-dialog>
    </section>
</template>

<script>
export default {
    data() {
        return {
          tableData: [],
          dialogTableVisible: false,


        data4: [
          // {
        //   id: 1,
        //   label: '一级 1',
        //   children: [{
        //     id: 4,
        //     label: '二级 1-1',
        //     children: [{
        //       id: 9,
        //       label: '三级 1-1-1'
        //     }, {
        //       id: 10,
        //       label: '三级 1-1-2'
        //     }]
        //   }]
        // }, {
        //   id: 2,
        //   label: '一级 2',
        //   children: [{
        //     id: 5,
        //     label: '二级 2-1'
        //   }, {
        //     id: 6,
        //     label: '二级 2-2'
        //   }]
        // }, {
        //   id: 3,
        //   label: '一级 3',
        //   children: [{
        //     id: 7,
        //     label: '二级 3-1'
        //   }, {
        //     id: 8,
        //     label: '二级 3-2'
        //   }]
        // }
        ],
        defaultProps: {
          children: 'nodes',
          label: 'text'
        }




        }
      },
      methods:{
          append(data) {
        const newChild = { id: id++, label: 'testtest', children: [] };
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);
      },

      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      },











       getdata(){
          this.$http.rolelist({
              sort:'createdAt',
              order:'asc',
              offset:'0',
              limit:'20',
          }).then(res=>{
              if(res.data.code==200){
                console.log(res)
                this.tableData=res.data.data.pageInfo.list
              }
          })
        },
         addrole(){
          this.$router.push({
                    path: 'addrole',
                })
        },
        //删除
        deleteone(scope){
          this.$http.deleterole({
             ids: scope.row.roleId,
          }).then(res=>{
              if(res.data.code==200){
                this.getdata()
              }
          })
        },
         // 修改
        updateone(scope){
           this.$router.push({name: 'updaterole',query:{insId:scope.row.roleId}})
        },
        menutree(){
          this.$http.menutree({
             id:'653071673cf64d74a63fc46e998b7d8a'
          }).then(res=>{
             console.log(res.data.data)
             this.data4=res.data.data
          })
        }
      },
      
        mounted(){
        this.getdata()
        this.menutree()
      }
 
}
</script>

<style>
.role{
  box-sizing: border-box;
    width: 100%;
    /* padding: 20px; */

}
.increase{
  padding: 6px 20px;
  display: flex;
  justify-content: space-between;
}
</style>
