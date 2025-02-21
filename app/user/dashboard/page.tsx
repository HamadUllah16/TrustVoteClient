'use client'
import React, { useEffect } from 'react'
import { Typography, Stack, Divider } from "@mui/material";
import UserSidebar from '@/app/components/UserComponents/UserSidebar';
import MainWrapper from '@/app/components/MainWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/redux/store';
import CompleteProfile from '@/app/components/CompleteProfile';
import { getElectionSession } from '@/app/redux/features/electionSessionSlice';
import RenderVoteCastingRoutes from '@/app/components/UserComponents/RenderVoteCastingRoutes';
import ElectionSessionStatus from '@/app/components/ElectionSessionStatus';
import withAuth from '@/app/utils/withAuth';

function VoteCastingPage() {
    const { profileCompletion } = useSelector((state: RootState) => state.user.userProfile)
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
                    <Stack gap={3} justifyContent={'space-between'}>
                        <ElectionSessionStatus />
                        <Divider sx={{ borderColor: 'secondary.200' }} />
                        {/* <PreviousElectionSessions /> */}
                    </Stack>
                    :
                    <CompleteProfile />
                }

            </Stack>
        </MainWrapper>
    )
}

export default withAuth(VoteCastingPage)