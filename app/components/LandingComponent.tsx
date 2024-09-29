import { Stack, Typography } from '@mui/material'
import React from 'react'
import LandingPageNavItems from './LandingPageNavItems'
import Image from 'next/image'

function LandingComponent() {
    return (
        <Stack className='flex-grow' px={'75px'} py={'15px'} flex={1}>
            <Stack
                className='flex-grow'
                flex={1}
                px={10}
                py={4}
                borderRadius={2}
                gap={3}
                justifyContent={'center'}
                alignItems={'center'}
            >
                <Stack
                    alignItems={'center'}
                    justifyContent={'center'}
                >
                    <Typography variant='h3' textAlign={'center'} fontWeight={'bold'}>
                        Revolutionizing Voting Systems
                    </Typography>
                    <Typography textAlign={'center'} variant='h6' color={'grey'}>
                        Trust Vote is a blockchain powered decentralized electronic voting system designed to ease the process of Voting.
                    </Typography>
                </Stack>

                <Stack direction={'row'} gap={3} justifyContent={'space-between'}>

                    <Stack>
                        <Typography
                            color={'secondary.100'}
                        >
                            Powered by
                        </Typography>
                        <Stack direction={'row'} gap={2} alignItems={'center'}>
                            <Image
                                src={'/solana-sol-logo.png'}
                                height={100}
                                width={100}
                                alt='solana logo'
                            />
                            <Typography color={'secondary.100'} fontWeight={'bold'} variant='h3'>
                                SOLANA
                            </Typography>
                        </Stack>
                    </Stack>

                </Stack>
            </Stack>

        </Stack>
    )
}

export default LandingComponent