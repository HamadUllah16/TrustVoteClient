'use client'
import { Button, Stack } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

function RenderVoteCastingRoutes() {
    const pathname = usePathname();
    const router = useRouter();
    return (
        <Stack alignItems={'center'} direction={'row'} gap={1}>
            <Button
                onClick={() => router.push('/user/cast-a-vote')}
                variant={pathname.endsWith('/user/cast-a-vote') ? 'contained' : 'outlined'}>
                Session
            </Button>

            <Button
                onClick={() => router.push('/user/cast-a-vote/national-assembly')}
                variant={pathname.startsWith('/user/cast-a-vote/national-assembly') ? 'contained' : 'outlined'}>
                National Assembly Voting
            </Button>

            <Button
                onClick={() => router.push('/user/cast-a-vote/provincial-assembly')}
                variant={pathname.startsWith('/user/cast-a-vote/provincial-assembly') ? 'contained' : 'outlined'}>
                Provincial Assembly Voting
            </Button>
        </Stack>

    )
}

export default RenderVoteCastingRoutes