import React from 'react'
import { Typography, Stack, Divider } from "@mui/material";
import Sidebar from '@/app/components/Sidebar';
import UserSidebarMenus from '@/app/components/UserComponents/UserSidebarMenus';

function VoteCastingPage() {
    return (
        <Stack direction={'row'} px={'75px'} py={'15px'} gap={4} flex={1}>
            <Sidebar>
                <UserSidebarMenus />
            </Sidebar>
            <Stack flex={1} gap={2} p={3} borderRadius={2} width={'100%'} bgcolor={'primary.contrastText'}>

                <Typography variant='h4' fontWeight={'bold'}>
                    Cast A Vote
                </Typography>

                <Divider />
            </Stack>
        </Stack>
    )
}

export default VoteCastingPage