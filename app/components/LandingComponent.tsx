import { Stack, Typography } from '@mui/material'
import React from 'react'
import LandingPageNavItems from './LandingPageNavItems'

function LandingComponent() {
    return (
        <Stack className='flex-grow' px={'75px'} py={'15px'} flex={1}>
            <Stack
                className='flex-grow'
                bgcolor={'secondary.main'}
                border={'1px solid'}
                borderColor={'secondary.200'}
                alignItems={'center'}
                justifyContent={'center'}
                flex={1}
                px={2}
                py={4}
                borderRadius={2}
                gap={3}
            >
                <Stack>
                    <Typography variant='h3' textAlign={'center'} fontWeight={'bold'}>
                        Revolutionizing Voting Systems
                    </Typography>
                    <Typography textAlign={'center'} variant='h6' color={'grey'}>
                        Trust Vote is a blockchain powered decentralized electronic voting system designed to ease the process of Voting.
                    </Typography>
                </Stack>

                <Stack
                    direction={'row'}
                    gap={2}
                >
                    <LandingPageNavItems />
                </Stack>
            </Stack>

        </Stack>
    )
}

export default LandingComponent