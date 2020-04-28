import manage from "@/view/home/manage"
import role from "@/view/home/role"
import menu from "@/view/home/menu"
import adduser from "@/view/home/adduser"
import addrole from "@/view/home/addrole"
import updateuser from "@/view/home/updateuser"
import updaterole from "@/view/home/updaterole"
import addmenu from "@/view/home/addmenu"
import updatemenu from "@/view/home/updatemenu"

export default{
    routes:[
    //管理员管理
        {
        path:"manage",
        name:"manage",
        component:manage,
    },
    //角色管理
    {
        path:"role",
        name:"role",
        component:role,
    },
    //菜单管理
    {
        path:"menu",
        name:"menu",
        component:menu,
    },
    //添加管理员
    {
        path:"adduser",
        name:"adduser",
        component:adduser,
    },
    //添加角色
    {
        path:"addrole",
        name:"addrole",
        component:addrole,
    },
    //添加菜单
    {
        path:"addmenu",
        name:"addmenu",
        component:addmenu,
    },
    // 修改管理员
    {
        path:"updateuser",
        name:"updateuser",
        component:updateuser,
    },
    // 修改角色
    {
        path:"updaterole",
        name:"updaterole",
        component:updaterole,
    },
    // 修改菜单
    {
        path:"updatemenu",
        name:"updatemenu",
        component:updatemenu,
    },
]
}