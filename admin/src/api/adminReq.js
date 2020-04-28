import axios from "axios";
//请求拦截
axios.interceptors.request.use((config)=>{
    if(config.url == "/upload"){
        return config;
    }
    console.log(config)
    let params = new URLSearchParams();
    if(config.method == "post"){
      if(config.data){
        
        for(var k in config.data){
          params.append(k,config.data[k])
        }
        config.data = params;
      }
      config.headers = {
        "content-type":"application/x-www-form-urlencoded"
      }
    }
    if(config.url.indexOf("/login")<0){
        config.headers.token = localStorage.admin_tokenID;
        // if(config.method == "get"){
        //     //判断是否有发送数据
        //     if(config.params){
        //         config.params.admin_ID = localStorage.admin_ID;
        //         config.params.admin_jsID = localStorage.admin_jsID;

        //     }else{
        //         config.params = {
        //             admin_ID:localStorage.admin_ID,
        //             admin_jsID : localStorage.admin_jsID
        //         }
        //     }
            
          
        // }else{
        //     params.append("admin_ID",localStorage.admin_ID);
        //     params.append("admin_jsID",localStorage.admin_jsID);
        //     config.data = params;
        // }
    }
    
    return config;
  })

//响应拦截器；
axios.interceptors.response.use((data)=>{
    if(data.status == 401){
        window.location.href = "http://localhost:8080/#/login";
        throw new Error("身份验证有误")
        localStorage.clear();
    }else{
        return data
    }
    
})
// let BASE_URL = 'http://172.20.110.1:8080';
let BASE_URL = 'http://172.20.111.113:8080';
export default {
    
    //登陆接口
    login(data){
        return axios({
            method:"post",
            url:`${BASE_URL}/console/login`,
            data
        })
    },
    //获取管理员详情
    listmessage(data){
        return axios({
            method:"get",
            url:`${BASE_URL}/console/admin/list`,
            params:data
        })
    },
    // menulist(data){
    //     return axios({
    //         method:"get",
    //         url:`${BASE_URL}/console/wapper`,
    //         params:data
    //     })
    // },
    //删除管理员
    deleteadmin(data){
        return axios({
            method:"get",
            url:`${BASE_URL}/console/admin/delete`,
            params:data
        })
    },
    //删除角色
    deleterole(data){
        return axios({
            method:"post",
            url:`${BASE_URL}/console/role/delete`,
            data
        })
    },
    //删除菜单
    deletemenu(data){
        return axios({
            method:"get",
            url:`${BASE_URL}/console/menu/delete`,
            params:data
        })
    },
    adminfrom(data){
        return axios({
            method:"get",
            url:`${BASE_URL}/console/admin/from`,
            params:data
        })
    },
    rolefrom(data){
        return axios({
            method:"get",
            url:`${BASE_URL}/console/role/from`,
            params:data
        })
    },
    menufrom(data){
        return axios({
            method:"get",
            url:`${BASE_URL}/console/menu/from`,
            params:data
        })
    },
    //新增管理员
    addadmin(data){
        return axios({
            method:"post",
            url:`${BASE_URL}/console/admin/save`,
            data
        })
    },
    //新增角色
    addrole(data){
        return axios({
            method:"post",
            url:`${BASE_URL}/console/role/save`,
            data
        })
    },
    addmenu(data){
        return axios({
            method:"post",
            url:`${BASE_URL}/console/menu/save`,
            data
        })
    },
    //角色列表
    rolelist(data){
        return axios({
            method:"get",
            url:`${BASE_URL}/console/role/list`,
            params:data
        })
    },
    //菜单管理列表
    menulist(data){
        return axios({
            method:"get",
            url:`${BASE_URL}/console/menu/list`,
            params:data
        })
    },
    //授权树
    menutree(data){
        return axios({
            method:"get",
            url:`${BASE_URL}/console/role/menutree`,
            params:data
        })
    },
    //授权列表
    menulist(data){
        return axios({
            method:"get",
            url:`${BASE_URL}/console/role/menulist`,
            params:data
        })
    },
    //授权
    grant(data){
        return axios({
            method:"post",
            url:`${BASE_URL}/console/role/grant`,
            data
        })
    },
}

