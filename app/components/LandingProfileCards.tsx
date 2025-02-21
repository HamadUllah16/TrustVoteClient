import { Box, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'

function LandingProfileCards({ title, subtitle, image, children }: { title: string, subtitle: string, image: string, children: React.ReactNode | null }) {
    return (
        <Stack
            sx={{
                backgroundImage: `url(${image})`
            }}
            className='flex flex-col justify-between max-w-sm w-full h-96 p-4 rounded-lg relative'
        >
            <Typography variant='h6' color={'primary.main'} fontWeight={'bolder'}>
                {title}
            </Typography>

            <div className='absolute w-full h-full flex items-center justify-center gap-3 top-0 left-0'>
                {children}
            </div>

            <Typography variant='body2' color={'secondary'} fontWeight={'bold'}>
                {subtitle}
            </Typography>
        </Stack>
    )
}

export default LandingProfileCards