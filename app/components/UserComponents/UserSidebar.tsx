import { Flag, HowToVote, People } from '@mui/icons-material'
import { Stack, Typography, MenuItem } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import Sidebar from '../Sidebar'
import SidebarMenus from '../SidebarMenus'

function UserSidebar() {
    return (
        <Sidebar>
            <SidebarMenus
                navItems={[
                    { href: '/user/cast-a-vote', title: 'Cast a Vote', icon: <HowToVote fontSize='medium' /> },
                    { href: '/user/view-candidates', title: 'View Candidates', icon: <People fontSize='medium' /> },
                    { href: '/user/view-political-parties', title: 'View Political Parties', icon: <Flag fontSize='medium' /> }
                ]}
            />
        </Sidebar>
    )
}

export default UserSidebar