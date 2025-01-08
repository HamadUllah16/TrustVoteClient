import { Dataset, Groups, HowToVote, Person } from '@mui/icons-material'
import React from 'react'
import Sidebar from '../Sidebar'
import SidebarMenus from '../SidebarMenus'

function CandidateSidebar() {
    return (
        <Sidebar>
            <SidebarMenus
                navItems={[
                    { href: '/candidate', title: 'My Profile', icon: <Person fontSize='medium' /> },
                    { href: '/candidate/election-session', title: 'Election Session', icon: <HowToVote fontSize='medium' /> },
                    { href: '/candidate/view-political-parties', title: 'View Political Parties', icon: <Groups fontSize='medium' /> },
                    { href: '/candidate/results', title: 'Results', icon: <Dataset fontSize='medium' /> }
                ]}
            />
        </Sidebar>
    )
}

export default CandidateSidebar