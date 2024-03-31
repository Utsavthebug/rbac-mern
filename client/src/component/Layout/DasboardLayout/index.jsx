import React from 'react'
import Sidebar from '../../Sidebar'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
  return (
    <div className='flex'>
        <Sidebar
        />
        <div className='w-full h-screen'>
            <Outlet/>
        </div>
    </div>
  )
}

export default DashboardLayout