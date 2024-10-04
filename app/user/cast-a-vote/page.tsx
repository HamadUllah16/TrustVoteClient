import React from 'react'
import { Typography, Stack, Divider } from "@mui/material";
import UserSidebar from '@/app/components/UserComponents/UserSidebar';
import MainWrapper from '@/app/components/MainWrapper';

function VoteCastingPage() {
    return (
        <MainWrapper>

            <UserSidebar />

            <Stack flex={1} gap={2} p={3} borderRadius={2} width={'100%'} bgcolor={'primary.contrastText'}>

                <Typography variant='h4' fontWeight={'bold'}>
                    Cast A Vote
                </Typography>

                <Divider />
            </Stack>

        </MainWrapper>
    )
}

export default VoteCastingPage