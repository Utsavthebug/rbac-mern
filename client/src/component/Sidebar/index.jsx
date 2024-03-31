import React from 'react'
import { SidebarConstant } from '../../constants/constants'
import SidebarElement from './SidebarElement'

const Sidebar = () => {
  return (
     <><aside id="logo-sidebar" className="w-55 h-screen pt-10 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
           <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
              <ul className="space-y-5 font-medium">
                 {
                  SidebarConstant.map((sidebarEl)=>(
                   <SidebarElement
                   label={sidebarEl.label}
                   Icon={sidebarEl.icon}
                   path={sidebarEl.path}
                   />
                  ))
                 }
                 
              </ul>
           </div>
        </aside>
        </>
  )
}

export default Sidebar