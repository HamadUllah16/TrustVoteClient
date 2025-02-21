'use client'
import { Divider, Stack } from '@mui/material'
import React from 'react'

function MainWrapper({ children }: { children: React.ReactNode }) {
    return (
        <Stack className='gap-4 flex-grow
        lg:px-20 lg:py-4
        md:px-2 md:py-4
        '>
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
            >
                {children}
            </Stack>
        </Stack>
    )
}

export default MainWrapper