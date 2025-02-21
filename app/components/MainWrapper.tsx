'use client'
import { Divider, Stack } from '@mui/material'
import React from 'react'

function MainWrapper({ children }: { children: React.ReactNode }) {
    return (
        <Stack className='gap-4 flex-grow
        xl:px-20 xl:py-4
        lg:px-2 lg:py-4
        w-dvw
        '>
            <Stack
                direction={'row'}
                minWidth={400}
                width={'100%'}
                minHeight={'100%'}
                px={3}
                gap={3}
                border={'1px solid'}
                borderColor={'secondary.200'}
                borderRadius={2}
                bgcolor={'secondary.main'}
            >
                {children}
            </Stack>
        </Stack>
    )
}

export default MainWrapper