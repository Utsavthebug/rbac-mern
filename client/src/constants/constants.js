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
        path:'/dashboard',
        label:'Dashboard',
        icon:MdDashboard
    },
    {
        path:'/roles',
        label:'Roles',
        icon:RiAdminFill
    },
    {
        path:'/users',
        label:'Users',
        icon:FaUsers 
    },
    {
        path:'/features',
        label:'Features',
        icon:IoMdKeypad 
    }

]