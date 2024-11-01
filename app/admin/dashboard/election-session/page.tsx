'use client'
import AdminSidebar from '@/app/components/AdminComponents/AdminSidebar'
import MainWrapper from '@/app/components/MainWrapper'
import { getAllCandidates, getPendingCandidates } from '@/app/redux/features/candidateSlice'
import { allPoliticalParties } from '@/app/redux/features/profileCompletionSlice'
import { AppDispatch, RootState } from '@/app/redux/store'
import { Circle } from '@mui/icons-material'
import { CircularProgress, Divider, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SchedulingElectionSession from '@/app/components/SchedulingElectionSession';
import { getElectionSession } from '@/app/redux/features/electionSessionSlice'
import Loading from '@/app/components/Loading'
import Countdown from '@/app/components/Countdown';
import dayjs from 'dayjs'

function ElectionSessionPage() {
    const { allCandidates, pendingCandidates } = useSelector((state: RootState) => state.candidate)
    const { allParties } = useSelector((state: RootState) => state.profileCompletion)
    const { electionSession, loading } = useSelector((state: RootState) => state.electionSession);
    const [showSchedule, setShowSchedule] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(getElectionSession());
        dispatch(getPendingCandidates());
        dispatch(getAllCandidates());
        dispatch(allPoliticalParties())
    }, [])
    return (
        <MainWrapper>

            <AdminSidebar />

            <Stack gap={2} py={3} flexGrow={1}>
                <Typography variant='h4' fontWeight={'bold'} color={'primary.main'}>Election Session</Typography>
                <Divider sx={{ borderColor: 'secondary.200' }} />

                <Stack justifyContent={'space-between'} flexGrow={1}>

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

                    </Stack>

                    <Stack alignItems={'center'} flexGrow={1} justifyContent={'center'}>


                        {loading &&
                            <CircularProgress size={'12px'} />
                        }
                        {electionSession && electionSession.status === 'active' &&
                            <Stack gap={1} p={1} >
                                <Typography variant='h6' color={'primary.main'}>
                                    Current Election Session
                                </Typography>
                                <Stack bgcolor={'primary.main'} direction={'row'} gap={1} p={1} border={'1px solid'} borderColor={'secondary.200'} borderRadius={1} justifyContent={'space-between'} alignItems={'center'}>
                                    <Stack p={2}>
                                        <Typography variant='subtitle1' color={'secondary.300'}>Name</Typography>
                                        <Typography variant='h5' color={'secondary.100'}>
                                            {electionSession.name}
                                        </Typography>
                                    </Stack>

                                    <Stack p={2}>
                                        <Typography variant='subtitle1' color={'secondary.300'}>Status</Typography>
                                        <Stack direction={'row'} gap={1} alignItems={'center'}>
                                            <Circle color={'success'} fontSize='small' />
                                            <Typography variant='h5' textTransform={'capitalize'} color={'secondary.100'}>
                                                {electionSession.status}
                                            </Typography>
                                        </Stack>
                                    </Stack>

                                </Stack>
                            </Stack>
                        }
                        {electionSession && electionSession.status === 'scheduled' &&
                            <Stack gap={1} p={1} >
                                <Typography variant='h6' color={'primary.main'}>
                                    Scheduled Election Session
                                </Typography>
                                <Stack bgcolor={'primary.main'} direction={'row'} gap={1} p={1} border={'1px solid'} borderColor={'secondary.200'} borderRadius={1} justifyContent={'space-between'} alignItems={'center'}>
                                    <Stack p={2}>
                                        <Typography variant='subtitle1' color={'secondary.300'}>Name</Typography>
                                        <Typography variant='h5' color={'secondary.100'}>
                                            {electionSession.name}
                                        </Typography>
                                    </Stack>

                                    <Countdown scheduledTime={electionSession.scheduledTime} />

                                    <Stack p={2}>
                                        <Typography variant='subtitle1' color={'secondary.300'}>Status</Typography>
                                        <Stack direction={'row'} gap={1} alignItems={'center'}>
                                            <Circle color={'disabled'} fontSize='small' />
                                            <Typography variant='h5' color={'secondary.100'}>
                                                Scheduled
                                            </Typography>
                                        </Stack>
                                    </Stack>

                                </Stack>
                            </Stack>
                        }
                        {electionSession && (electionSession.status === '' || electionSession.status === 'ended') &&
                            <Stack gap={1} p={3}>
                                <Typography variant='h6' color={'primary.main'}>
                                    Schedule an Election Session
                                </Typography>
                                <SchedulingElectionSession />
                            </Stack>
                        }

                    </Stack>

                    {/* {electionSession && electionSession._id &&
                        <Stack width={'fit-content'} border={'1px solid'} borderColor={'secondary.200'} borderRadius={1} p={2}>
                            <Typography variant='subtitle1' color={'primary.200'}>Status</Typography>

                            <Stack direction={'row'} gap={1} alignItems={'center'}>
                                <Circle color={electionSession.active ? 'success' : !electionSession.end ? 'warning' : 'info'} fontSize='small' />
                                <Typography variant='h5' color={'secondary.100'}>
                                    {electionSession.active ? 'Active' : !electionSession.end ? 'Paused' : 'Ready'}
                                </Typography>
                            </Stack>
                        </Stack>
                    } */}
                </Stack>
            </Stack>
        </MainWrapper>
    )
}

export default ElectionSessionPage