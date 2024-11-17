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
                <Grid container p={2} justifyContent={'space-between'}>
                    <Grid sm={7}>
                        <CompleteProfile />
                    </Grid>

                    <Grid sm={4}>
                        <ProfileCompletionVerificationStatus />
                    </Grid>
                </Grid>
            </PageHeader>
        </MainWrapper>
    )
}

export default UserUpdateProfile