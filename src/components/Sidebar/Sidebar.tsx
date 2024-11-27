import React from 'react'
import SidebarAdmin from "./Sidebar.module.scss"
import clsx from 'clsx'
import LinkClick from '../LinkClick/LinkClick'

import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
export default function Sidebar() {
  return (
    <div className={clsx(SidebarAdmin.container_sidebar)} style={{display:"flex",justifyContent:"space-between",flexDirection:"column"}}>
      <div className={SidebarAdmin.container_link}>  
      <LinkClick icon={<DashboardIcon/>} text = "Dashboard" link="dashboard"/>
      <LinkClick icon={<AccountCircleIcon/>} text = "User Management" link="dashboard/user-manegement"/>
      </div>
      <div className={SidebarAdmin.container_link}>
      <LinkClick icon={<AccountCircleIcon/>} text = "Logout" link="dashboard/user-manegement"/>
      </div>
    </div>
  )
}
