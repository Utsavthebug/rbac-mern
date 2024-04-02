import {lazy} from "react";
import Users from "../pages/users";
import Features from "../pages/features";

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
    path:`${adminroot}/dashboard`,
    component:Roles

    },
    {
        path:`${adminroot}/roles`,
        component:Roles
    },
    {
        path:`${adminroot}/users`,
        component:Users

    },
    {
        path:`${adminroot}/features`,
        component:Features
    }
]