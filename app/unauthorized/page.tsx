import { Stack, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'

function UnauthorizedPage() {
    return (
        <Stack alignItems={'center'} justifyContent={'center'} px={'75px'} py={'15px'} flex={1}>
            <Stack p={2} alignItems={'center'} gap={3} justifyContent={'center'} borderRadius={2} flexGrow={1} width={'100%'}>
                <Typography color={'primary.main'} variant="h1" fontWeight={'bold'} textAlign={'center'}>
                    401
                </Typography>
                <Typography variant="h4" textAlign={'center'} color={'secondary.100'}>
                    You are not authorized to view this page.
                </Typography>
                {/* <Image
                    src={'/thisisfine.gif'}
                    alt='dog in a burning house saying its fine -meme'
                    width={200}
                    height={200}
                /> */}
            </Stack>
        </Stack>
    )
}

export default UnauthorizedPage