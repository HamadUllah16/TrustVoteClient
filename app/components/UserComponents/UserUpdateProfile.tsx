import React from 'react'
import MainWrapper from '../MainWrapper'
import PageHeader from '../PageHeader'
import CompleteProfile from '../CompleteProfile'
import Sidebar from '../Sidebar'
import { Grid, Stack } from '@mui/material'
import ProfileCompletionVerificationStatus from '../ProfileCompletionVerificationStatus'
import Grid2 from '@mui/material/Unstable_Grid2'

function UserUpdateProfile() {
    return (
        <MainWrapper>
            <Sidebar>
                null
            </Sidebar>
            <PageHeader
                title='Profile Update'
                subtitle={'A completed profile is required to vote for candidates.'}
                action={null}
            >
                <Grid container justifyContent={'space-between'}>
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