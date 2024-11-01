'use client'
import React, { useEffect, useState } from 'react'
import { Typography, Stack, Divider, Button, CircularProgress } from "@mui/material";
import UserSidebar from '@/app/components/UserComponents/UserSidebar';
import MainWrapper from '@/app/components/MainWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/redux/store';
import CompleteProfile from '@/app/components/CompleteProfile';
import RenderBallots from '@/app/components/RenderBallots';
import { useRouter } from 'next/navigation';
import Loading from '@/app/components/Loading';
import { Circle } from '@mui/icons-material';
import { getElectionSession } from '@/app/redux/features/electionSessionSlice';
import RenderVoteCastingRoutes from '@/app/components/UserComponents/RenderVoteCastingRoutes';

function VoteCastingPage() {
    const { profileCompletion } = useSelector((state: RootState) => state.user.userProfile)
    const router = useRouter();
    const { loading, electionSession } = useSelector((state: RootState) => state.electionSession)
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getElectionSession())
    }, [])
    return (
        <MainWrapper>

            <UserSidebar />

            <Stack
                flex={1}
                gap={2}
                py={3}
            >
                <Stack direction={'row'} gap={1} justifyContent={'space-between'}>

                    <Typography variant='h4' fontWeight={'bold'} color={'primary.main'}>
                        Cast A Vote
                    </Typography>

                    <RenderVoteCastingRoutes />

                </Stack>
                <Divider sx={{ borderColor: 'secondary.200' }} />

                {profileCompletion ?
                    <Stack gap={2}>

                        {loading ?
                            <CircularProgress size={'24px'} />
                            :
                            electionSession && electionSession._id &&
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
                                            <Circle color={electionSession.status === 'active' ? 'success' : electionSession.status === 'paused' ? 'warning' : 'error'} fontSize='small' />
                                            <Typography variant='h5' textTransform={'capitalize'} color={'secondary.100'}>
                                                {electionSession.status}
                                            </Typography>
                                        </Stack>
                                    </Stack>

                                </Stack>
                            </Stack>

                        }


                    </Stack>
                    :
                    <CompleteProfile />
                }

            </Stack>
        </MainWrapper>
    )
}

export default VoteCastingPage