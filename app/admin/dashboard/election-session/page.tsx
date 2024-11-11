'use client'
import AdminSidebar from '@/app/components/AdminComponents/AdminSidebar'
import MainWrapper from '@/app/components/MainWrapper'
import { getApprovedCandidates, getPendingCandidates } from '@/app/redux/features/candidateSlice'
import { allPoliticalParties } from '@/app/redux/features/profileCompletionSlice'
import { AppDispatch, RootState } from '@/app/redux/store'
import { Divider, Stack, Typography } from '@mui/material'
import React, { useEffect, } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ElectionSessionStatus from '@/app/components/ElectionSessionStatus'
import { getVerifiedUsersCount } from '@/app/redux/features/adminSlice'

function ElectionSessionPage() {
    const { approvedCandidates } = useSelector((state: RootState) => state.candidate)
    const { allParties } = useSelector((state: RootState) => state.profileCompletion)
    const { userCount } = useSelector((state: RootState) => state.admin)
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(getPendingCandidates());
        dispatch(getApprovedCandidates());
        dispatch(allPoliticalParties())
        dispatch(getVerifiedUsersCount())
    }, [])
    return (
        <MainWrapper>

            <AdminSidebar />

            <Stack gap={2} py={3} flexGrow={1}>
                <Typography variant='h4' fontWeight={'bold'} color={'primary.main'}>Election Session</Typography>
                <Divider sx={{ borderColor: 'secondary.200' }} />


                <Stack flexGrow={1} gap={2} justifyContent={'space-between'}>

                    <ElectionSessionStatus />

                    <Stack gap={2}>
                        <Divider sx={{ borderColor: 'secondary.200' }} />
                        <Stack direction={'row'} justifyContent={'space-between'} gap={3}>
                            <Stack direction={'row'} gap={2}>

                                {approvedCandidates &&
                                    <Stack border={'1px solid'} borderColor={'secondary.200'} borderRadius={1} p={2}>
                                        <Typography variant='subtitle1' color={'primary.200'}>Nominated Candidates</Typography>
                                        <Typography variant='h5' color={'secondary.100'}>
                                            {approvedCandidates.length}
                                        </Typography>
                                    </Stack>
                                }

                                {allParties &&
                                    <Stack border={'1px solid'} borderColor={'secondary.200'} borderRadius={1} p={2}>
                                        <Typography variant='subtitle1' color={'primary.200'}>Political Parties Listed</Typography>
                                        <Typography variant='h5' color={'secondary.100'}>
                                            {allParties.length}
                                        </Typography>
                                    </Stack>
                                }

                                <Stack border={'1px solid'} borderColor={'secondary.200'} borderRadius={1} p={2}>
                                    <Typography variant='subtitle1' color={'primary.200'}>Voters Registered</Typography>
                                    <Typography variant='h5' color={'secondary.100'}>
                                        {userCount}
                                    </Typography>
                                </Stack>

                            </Stack>

                        </Stack>


                    </Stack>
                </Stack>
            </Stack>
        </MainWrapper >
    )
}

export default ElectionSessionPage