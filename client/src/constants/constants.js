import { MdDashboard } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa6";
import { IoMdKeypad } from "react-icons/io";
import { useId } from "react";

export const fetchStatus = {
    loading:'loading',
    succeded:'succeded',
    failed:'failed'
}

export const SidebarConstant = [
    {   
        id:1,
        path:'/admin/dashboard',
        label:'Dashboard',
        icon:MdDashboard
    },  
    {   
        id:2,
        path:'/admin/roles',
        label:'Roles',
        icon:RiAdminFill
    },
    {   
        id:3,
        path:'/admin/users',
        label:'Users',
        icon:FaUsers 
    },
    {   
        id:4,
        path:'/admin/features',
        label:'Features',
        icon:IoMdKeypad 
    }

]

export const table_constants = {
    role_table : {
        headers :[
            "Role",
            "Created",
            "Description"
        ]
    },
    user_table:{
        headers:[
            "Name",
            "User Role"
        ],
        columnKeys:['name','role']
    },
    feature_table:{
        headers:[
            "Feature Name",
            "Active for All",
            "Created At",

        ],
        columnKeys:['name','active','createdAt']
    },

}