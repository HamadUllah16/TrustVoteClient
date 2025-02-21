import { Dataset, Flag, HowToVote, People } from '@mui/icons-material'
import React from 'react'
import Sidebar from '../Sidebar'
import SidebarMenus from '../SidebarMenus'
import MobileNav from '../MobileNav'

function UserSidebar() {
    return (
        <>
            <Sidebar>
                <SidebarMenus
                    navItems={[
                        { href: '/user/cast-a-vote', title: 'Cast a Vote', icon: <HowToVote fontSize='medium' /> },
                        { href: '/user/view-candidates', title: 'View Candidates', icon: <People fontSize='medium' /> },
                        { href: '/user/view-political-parties', title: 'View Political Parties', icon: <Flag fontSize='medium' /> },
                        { href: '/user/results', title: 'Results', icon: <Dataset fontSize='medium' /> }
                    ]}
                />
            </Sidebar>
            <MobileNav
                navItems={[
                    { href: '/user/cast-a-vote', title: 'Cast a Vote', icon: <HowToVote fontSize='medium' /> },
                    { href: '/user/view-candidates', title: 'View Candidates', icon: <People fontSize='medium' /> },
                    { href: '/user/view-political-parties', title: 'View Political Parties', icon: <Flag fontSize='medium' /> },
                    { href: '/user/results', title: 'Results', icon: <Dataset fontSize='medium' /> }
                ]}
            />
        </>
    )
}

export default UserSidebar