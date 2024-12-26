import CandidateCompletion from '@/app/components/Candidate/CandidateCompletion'
import MainWrapper from '@/app/components/MainWrapper'
import PageHeader from '@/app/components/PageHeader'
import Sidebar from '@/app/components/Sidebar'
import SidebarMenus from '@/app/components/SidebarMenus'
import { AccountCircle } from '@mui/icons-material'
import { Stack } from '@mui/material'
import React from 'react'

function UpdateProfile() {
    return (
        <MainWrapper>

            <Sidebar>
                <SidebarMenus
                    navItems={[
                        { title: 'Update Profle', icon: <AccountCircle />, href: '/candidate/settings/update-profile' }
                    ]}
                />
            </Sidebar>

            <PageHeader
                title='Update Profile'
                subtitle={'A 100% complete profile is required to be considered for nomination.'}
                action={null}
            >
                <CandidateCompletion />
            </PageHeader>

        </MainWrapper>
    )
}

export default UpdateProfile