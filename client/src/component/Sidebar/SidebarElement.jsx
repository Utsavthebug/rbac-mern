import React from 'react'
import { Link,NavLink } from 'react-router-dom'

const SidebarElement = ({
    label,
    Icon,
    path
}) => {
  return (
    <li>
    <NavLink to={path} className={({isActive}) => `flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${isActive?'bg-gray-100':''}`}>
        <Icon className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
        <span className="ms-3">{label}</span>
        </NavLink >
        </li>
  )
}

export default SidebarElement