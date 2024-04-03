import { MdDashboard } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa6";
import { IoMdKeypad } from "react-icons/io";

export const fetchStatus = {
    loading:'loading',
    succeded:'succeded',
    failed:'failed'
}

export const SidebarConstant = [
    {
        path:'/admin/dashboard',
        label:'Dashboard',
        icon:MdDashboard
    },
    {
        path:'/admin/roles',
        label:'Roles',
        icon:RiAdminFill
    },
    {
        path:'/admin/users',
        label:'Users',
        icon:FaUsers 
    },
    {
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
    }
}