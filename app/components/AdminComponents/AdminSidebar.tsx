'use client'
import React from 'react'
import Sidebar from '../Sidebar'
import SidebarMenus from '../SidebarMenus'
import { Dataset, Groups, HowToVote, PendingActions, RecentActors, WhereToVote } from '@mui/icons-material'
import MobileNav from '../MobileNav'

function AdminSidebar() {
    return (
        <>
            <Sidebar>
                <SidebarMenus
                    navItems={[
                        { href: '/admin/dashboard', title: 'Election Session', icon: <HowToVote fontSize='medium' /> },
                        { href: '/admin/dashboard/candidates/list', title: 'Nominated Candidates', icon: <RecentActors fontSize='medium' /> },
                        { href: '/admin/dashboard/candidates/pending-candidates', title: 'Pending Candidates', icon: <PendingActions fontSize='medium' /> },
                        { href: '/admin/dashboard/constituency', title: 'Constituency', icon: <WhereToVote fontSize='medium' /> },
                        { href: '/admin/dashboard/political-parties/list', title: 'All Political Parties', icon: <Groups fontSize='medium' /> },
                        { href: '/admin/dashboard/results', title: 'Results', icon: <Dataset fontSize='medium' /> }
                    ]}
                />
            </Sidebar>
            <MobileNav
                navItems={[
                    { href: '/admin/dashboard', title: 'Election Session', icon: <HowToVote fontSize='large' /> },
                    { href: '/admin/dashboard/candidates/list', title: 'Nominated Candidates', icon: <RecentActors fontSize='large' /> },
                    { href: '/admin/dashboard/candidates/pending-candidates', title: 'Pending Candidates', icon: <PendingActions fontSize='large' /> },
                    { href: '/admin/dashboard/constituency', title: 'Constituency', icon: <WhereToVote fontSize='large' /> },
                    { href: '/admin/dashboard/political-parties/list', title: 'All Political Parties', icon: <Groups fontSize='large' /> },
                    { href: '/admin/dashboard/results', title: 'Results', icon: <Dataset fontSize='large' /> }
                ]}
            />
        </>
    )
}

export default AdminSidebar