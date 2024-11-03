'use client'
import React, { useState } from 'react'
import { Typography, Stack, Divider, Button } from "@mui/material";
import UserSidebar from '@/app/components/UserComponents/UserSidebar';
import MainWrapper from '@/app/components/MainWrapper';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';
import CompleteProfile from '@/app/components/CompleteProfile';
import RenderBallots from '@/app/components/RenderBallots';
import { useRouter } from 'next/navigation';
import RenderProvincialBallots from '@/app/components/RenderProvincialBallots';
import RenderVoteCastingRoutes from '@/app/components/UserComponents/RenderVoteCastingRoutes';

function VoteCastingPage() {
    const { profileCompletion } = useSelector((state: RootState) => state.user.userProfile)
    const router = useRouter();
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

                        <RenderProvincialBallots />

                    </Stack>
                    :
                    <CompleteProfile />
                }

            </Stack>
        </MainWrapper>
    )
}

export default VoteCastingPage