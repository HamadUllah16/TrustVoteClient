'use client'
import React, { useEffect } from 'react'
import { Stack, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/app/redux/store'

function ProfileStats() {
    const { userProfile } = useSelector((state: RootState) => state.user)
    return (
        <Stack>

            <Stack direction={'row'} gap={1}>
                <Stack border={'1px solid'} borderColor={'secondary.200'} borderRadius={1} p={2} width={'fit-content'}>
                    <Typography variant='subtitle1' color={'primary.200'}>Status</Typography>
                    <Typography variant='h5' color={'secondary.100'} textTransform={'capitalize'}>
                        {userProfile.status}
                    </Typography>
                </Stack>

                <Stack border={'1px solid'} borderColor={'secondary.200'} borderRadius={1} p={2} width={'fit-content'}>
                    <Typography variant='subtitle1' color={'primary.200'}>Affiliation</Typography>
                    <Typography variant='h5' color={'secondary.100'} textTransform={'capitalize'}>
                        {userProfile.partyAffiliation}
                    </Typography>
                </Stack>

                <Stack border={'1px solid'} borderColor={'secondary.200'} borderRadius={1} p={2} width={'fit-content'}>
                    <Typography variant='subtitle1' color={'primary.200'}>Constituency</Typography>
                    <Typography variant='h5' color={'secondary.100'} textTransform={'capitalize'}>
                        {userProfile.constituency}
                    </Typography>
                </Stack>
            </Stack>

            <Stack>

            </Stack>

        </Stack>
    )
}

export default ProfileStats