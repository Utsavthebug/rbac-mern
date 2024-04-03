import React, { useEffect } from 'react'
import Sidebar from '../../Sidebar'
import { Outlet } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { fetchRoles } from '../../../store/roles/roleSlice'

const DashboardLayout = () => {
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(fetchRoles())
  },[])
  return (
    <div className='flex md:overflow-hidden'>
        <Sidebar
        />
        <div className='w-full h-screen'>
            <Outlet/>
        </div>
    </div>
  )
}

export default DashboardLayout