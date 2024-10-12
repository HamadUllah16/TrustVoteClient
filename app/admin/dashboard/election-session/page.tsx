'use client'
import AdminSidebar from '@/app/components/AdminComponents/AdminSidebar'
import MainWrapper from '@/app/components/MainWrapper'
import { getAllCandidates, getPendingCandidates } from '@/app/redux/features/candidateSlice'
import { allPoliticalParties } from '@/app/redux/features/profileCompletionSlice'
import { AppDispatch, RootState } from '@/app/redux/store'
import { AccessTime } from '@mui/icons-material'
import { Button, Divider, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function ElectionSessionPage() {
    const { allCandidates, pendingCandidates } = useSelector((state: RootState) => state.candidate)
    const { allParties } = useSelector((state: RootState) => state.profileCompletion)
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(getPendingCandidates());
        dispatch(getAllCandidates());
        dispatch(allPoliticalParties())
    }, [])
    return (
        <MainWrapper>

            <AdminSidebar />

            <Stack gap={2} py={3} flexGrow={1} >
                <Typography variant='h4' fontWeight={'bold'} color={'primary.main'}>Election Session</Typography>
                <Divider sx={{ borderColor: 'secondary.200' }} />

                <Stack direction={'row'} justifyContent={'space-between'} gap={3}>

                    <Stack direction={'row'} gap={2}>

                        {pendingCandidates && allCandidates &&
                            <Stack border={'1px solid'} borderColor={'secondary.200'} borderRadius={1} p={2}>
                                <Typography variant='subtitle1' color={'primary.200'}>Nominated Candidates</Typography>
                                <Typography variant='h5' color={'secondary.100'}>
                                    {allCandidates.length}
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
                                100,000
                            </Typography>
                        </Stack>

                    </Stack>

                    <Stack direction={'row'} gap={1} alignItems={'center'} border={'1px solid'} borderColor={'secondary.200'} borderRadius={1} p={2}>
                        <AccessTime sx={{ color: 'primary.200' }} />

                        <Typography variant='h5' color={'secondary.100'}>
                            00:00:00
                        </Typography>
                    </Stack>

                </Stack>

                <Stack alignItems={'center'} flexGrow={1}>
                    <Stack border={'1px solid'} borderColor={'secondary.200'} p={3} borderRadius={1}>

                        <Typography variant='h6' color={'primary.main'}>
                            Begin Election Session
                        </Typography>

                        <Button variant='outlined'>
                            Begin
                        </Button>

                    </Stack>
                </Stack>

            </Stack>
        </MainWrapper>
    )
}

export default ElectionSessionPage