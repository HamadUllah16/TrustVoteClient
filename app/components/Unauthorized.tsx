'use client'
import { Button, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import React from 'react'

function Unauthorized() {
    const router = useRouter();
    return (
        <Stack
            px={'75px'}
            py={'15px'}
            flexGrow={1}
        >
            <Stack
                p={4}
                gap={2}
                flexGrow={1}
                border={'1px solid #DADADA'}
                borderRadius={2}
                bgcolor={'primary.contrastText'}
                alignItems={'center'}
                justifyContent={'center'}
            >
                <Stack gap={0.5}>
                    <Typography
                        textAlign={'center'}
                        variant='h4'
                    >
                        401
                    </Typography>
                    <Typography
                        textAlign={'center'}
                        variant='body1'
                    >
                        Unauthorized
                    </Typography>
                </Stack>
                <Button variant='outlined' onClick={() => router.back()}>
                    Back
                </Button>
            </Stack>
        </Stack>
    )
}

export default Unauthorized