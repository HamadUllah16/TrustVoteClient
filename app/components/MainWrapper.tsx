'use client'
import { Divider, Stack } from '@mui/material'
import React from 'react'

function MainWrapper({ children }: { children: React.ReactNode }) {
    return (
        <Stack px={'75px'} py={'15px'} gap={4} flex={1}>
            <Stack
                direction={'row'}
                minWidth={400}
                minHeight={'100%'}
                px={3}
                gap={3}
                border={'1px solid'}
                borderColor={'secondary.200'}
                borderRadius={2}
                bgcolor={'secondary.main'}
                divider={<Divider orientation='vertical' sx={{ borderColor: 'secondary.200' }} />}
            >
                {children}
            </Stack>
        </Stack>
    )
}

export default MainWrapper