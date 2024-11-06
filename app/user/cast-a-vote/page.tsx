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
import Countdown from '@/app/components/Countdown';
import ElectionSessionStatus from '@/app/components/ElectionSessionStatus';

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
                    <ElectionSessionStatus />
                    :
                    <CompleteProfile />
                }

            </Stack>
        </MainWrapper>
    )
}

export default VoteCastingPage