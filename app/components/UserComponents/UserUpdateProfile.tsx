import React from 'react'
import MainWrapper from '../MainWrapper'
import PageHeader from '../PageHeader'
import CompleteProfile from '../CompleteProfile'
import Sidebar from '../Sidebar'
import { Grid, Stack } from '@mui/material'
import ProfileCompletionVerificationStatus from '../ProfileCompletionVerificationStatus'
import Grid2 from '@mui/material/Unstable_Grid2'
import SidebarMenus from '../SidebarMenus'
import { AccountCircle } from '@mui/icons-material'

function UserUpdateProfile() {
    return (
        <MainWrapper>
            <Sidebar>
                <SidebarMenus
                    navItems={[
                        { href: '/update-profile', title: 'Profile Settings', icon: <AccountCircle /> }
                    ]}
                />
            </Sidebar>
            <PageHeader
                title='Profile Update'
                subtitle={'Update your profile. A complete profile makes you eligible for voting.'}
                action={null}
            >
                <Stack p={2} className='lg:flex-row md:flex-col-reverse sm:flex-col-reverse max-sm:flex-col-reverse justify-between gap-5'>
                    <Stack >
                        <CompleteProfile />
                    </Stack>

                    <Stack>
                        <ProfileCompletionVerificationStatus />
                    </Stack>
                </Stack>
            </PageHeader>
        </MainWrapper>
    )
}

export default UserUpdateProfile