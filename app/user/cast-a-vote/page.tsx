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
                <Typography variant='h4' fontWeight={'bold'} color={'primary.main'}>
                    Cast A Vote
                </Typography>

                <Divider sx={{ borderColor: 'secondary.200' }} />

                {profileCompletion ?
                    <Stack gap={2}>

                        <Stack alignItems={'center'} direction={'row'} gap={1}>
                            <Button
                                onClick={() => router.push('/user/cast-a-vote')}
                                variant={'contained'}>
                                National Assembly Voting
                            </Button>

                            <Button
                                onClick={() => router.push('/user/cast-a-vote/provincial-assembly')}
                                variant={'outlined'}>
                                Provincial Assembly Voting
                            </Button>
                        </Stack>

                        <RenderBallots />

                    </Stack>
                    :
                    <CompleteProfile />
                }

            </Stack>
        </MainWrapper>
    )
}

export default VoteCastingPage