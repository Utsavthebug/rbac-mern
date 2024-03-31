import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoutes = ({isAuth,permissions=[]}) => {
  //getting role
  return <Outlet/>
  // const role = sessionStorage.getItem('role')
  // const isAuthorised = permissions.length===0 ? true : permissions.includes(role)

  // return ((isAuth && isAuthorised)  ? <Outlet/> : <Navigate to={"/login"} replace/>)
}

export default ProtectedRoutes