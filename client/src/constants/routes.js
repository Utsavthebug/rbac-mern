import {lazy} from "react";

const Login = lazy(()=>import("../pages/login")) 
const Roles = lazy(()=>import("../pages/roles"))

export const authRoutes = [
    {
        path:'/login',
        component:Login
    },
]

const adminroot = '/admin'

export const adminRoutes = [
    
    {
    path:`${adminroot}`,
    component:Roles

    },
    {
        path:`${adminroot}/roles`,
        component:Roles
    },
    {
        path:`${adminroot}/users`,
        component:Roles

    },
    {
        path:`${adminroot}/features`,
        component:Roles
    }
]