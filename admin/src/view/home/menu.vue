<template>
  <div class="menu">
      <h1>资源管理</h1>
      <div class="increase">
        <span>列表管理</span>
        <el-button type="primary" @click="addmenu">添加资源</el-button>
      </div>

      <el-table
    :data="tableData"
    style="width: 100%;margin-bottom: 20px;"
    row-key="menuId"
    default-expand-all
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
    <el-table-column
      header-align="center"
      align="center"
      prop="menuName"
      label="菜单名称"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      header-align="center"
      align="center"
      prop="menuCode"
      label="权限标识"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      header-align="center"
      align="center"
      prop="menuUrl"
      label="菜单url">
    </el-table-column>
    <el-table-column
      header-align="center"
      align="center"
      prop="menuType"
      label="菜单类型">
    </el-table-column>
    <el-table-column
      header-align="center"
      align="center"
      prop="listorder"
      label="排序">
    </el-table-column>
    <el-table-column
      header-align="center"
      align="center"
            label="创建时间"
            width="180">
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
            width="180">
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
            width="180">
             <template slot-scope="scope">
                <div>
                  <el-button type="text"  @click="deleteone(scope)">删除</el-button>
                  <el-button type="text"  @click="updateone(scope)">修改</el-button>
                </div>
              </template>
        </el-table-column>
  </el-table>
  </div>
 
</template>

<script>
import axios from "axios";
export default {
    data() {
      return {
        tableData:[]
        //  [{
        //   id: 1,
        //   date: '2016-05-02',
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1518 弄'
        // }, {
        //   id: 2,
        //   date: '2016-05-04',
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1517 弄'
        // }, {
        //   id: 3,
        //   date: '2016-05-01',
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1519 弄',
        //   children: [{
        //       id: 33,
        //       date: '2016-05-01',
        //       name: '王小虎',
        //       address: '上海市普陀区金沙江路 1519 弄',
        //       children: [{
        //       id: 34,
        //       date: '2016-05-01',
        //       name: '王小虎',
        //       address: '上海市普陀区金沙江路 1519 弄',
        //       children: [{
        //       id: 343,
        //       date: '2016-05-01',
        //       name: '王小虎',
        //       address: '上海市普陀区金沙江路 1519 弄'
        //     }, {
        //       id: 3354,
        //       date: '2016-05-01',
        //       name: '王小虎',
        //       address: '上海市普陀区金沙江路 1519 弄'
        //   }]
        //     }, {
        //       id: 335,
        //       date: '2016-05-01',
        //       name: '王小虎',
        //       address: '上海市普陀区金沙江路 1519 弄'
        //   }]
        //     }, {
        //       id: 32,
        //       date: '2016-05-01',
        //       name: '王小虎',
        //       address: '上海市普陀区金沙江路 1519 弄'
        //   }]
        // }, {
        //   id: 4,
        //   date: '2016-05-03',
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1516 弄'
        // }],
      }
    },
      mounted(){
        this.getdata()
      },
      methods:{
        // 列表
        getdata(){
          this.$http.menulist({
              sort:'createdAt',
              order:'asc',
              offset:'0',
              limit:'20',
          }).then(res=>{
              if(res.data.code==200){
                // this.tableData=res.data.data.pageInfo.list
                console.log(res)
                this.tableData=res.data.data.treeList
              }
          })
        },
        addmenu(){
           this.$router.push({
                path: 'addmenu',
            })
        },
           //删除
        deleteone(scope){
          this.$http.deletemenu({
             ids: scope.row.menuId,
          }).then(res=>{
              if(res.data.code==200){
                this.getdata()
              }
          })
        },
        //修改
         updateone(scope){
           this.$router.push({name: 'updatemenu',query:{insId:scope.row.menuId}})
        }
    }
  }   

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.menu{
  width: 100%;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.increase{
  padding: 6px 20px;
  display: flex;
  justify-content: space-between;
}
</style>
