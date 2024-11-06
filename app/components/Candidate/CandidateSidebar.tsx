import { Dataset, Groups, HowToVote, Person } from '@mui/icons-material'
import React from 'react'
import Sidebar from '../Sidebar'
import SidebarMenus from '../SidebarMenus'

function CandidateSidebar() {
    return (
        <Sidebar>
            <SidebarMenus
                navItems={[
                    { href: '/candidate/dashboard/me', title: 'My Profile', icon: <Person fontSize='medium' /> },
                    { href: '/candidate/dashboard/election-session', title: 'Election Session', icon: <HowToVote fontSize='medium' /> },
                    { href: '/candidate/dashboard/view-politial-parties', title: 'View Political Parties', icon: <Groups fontSize='medium' /> },
                    { href: '/candidate/dashboard/results', title: 'Results', icon: <Dataset fontSize='medium' /> }
                ]}
            />
        </Sidebar>
    )
}

export default CandidateSidebar