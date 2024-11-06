import React from 'react'
import Sidebar from '../Sidebar'
import SidebarMenus from '../SidebarMenus'
import { Dataset, Groups, HowToVote, PendingActions, RecentActors, WhereToVote } from '@mui/icons-material'

function AdminSidebar() {
    return (
        <Sidebar>
            <SidebarMenus
                navItems={[
                    { href: '/admin/dashboard/election-session', title: 'Election Session', icon: <HowToVote fontSize='medium' /> },
                    { href: '/admin/dashboard/candidates/list', title: 'Nominated Candidates', icon: <RecentActors fontSize='medium' /> },
                    { href: '/admin/dashboard/candidates/pending-candidates', title: 'Pending Candidates', icon: <PendingActions fontSize='medium' /> },
                    { href: '/admin/dashboard/constituency', title: 'Constituency', icon: <WhereToVote fontSize='medium' /> },
                    { href: '/admin/dashboard/political-parties/list', title: 'All Political Parties', icon: <Groups fontSize='medium' /> },
                    { href: '/admin/dashboard/results', title: 'Results', icon: <Dataset fontSize='medium' /> }
                ]}
            />
        </Sidebar>
    )
}

export default AdminSidebar