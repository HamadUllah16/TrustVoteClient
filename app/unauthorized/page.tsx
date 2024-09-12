import { Stack, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'

function UnauthorizedPage() {
    return (
        <Stack alignItems={'center'} justifyContent={'center'} px={'75px'} py={'15px'} flex={1}>
            <Stack bgcolor={'primary.contrastText'} p={2} alignItems={'center'} justifyContent={'center'} borderRadius={2} flexGrow={1} width={'100%'}>
                <Typography variant="h1" fontWeight={'bold'} textAlign={'center'}>
                    401
                </Typography>
                <Typography variant="h4" textAlign={'center'}>
                    Unauthorized
                </Typography>
                <Typography variant="subtitle2" textAlign={'center'}>
                    hope you're not lost
                </Typography>
                <Image
                    src={'/thisisfine.gif'}
                    alt='dog in a burning house saying its fine -meme'
                    width={300}
                    height={500}
                />
            </Stack>
        </Stack>
    )
}

export default UnauthorizedPage