'use client'
import { Button, Grid, Link, Stack, Typography } from '@mui/material'
import React from 'react'
import LandingPageNavItems from './LandingPageNavItems'
import Image from 'next/image'
import LandingProfileCards from './LandingProfileCards';
import { useRouter } from 'next/navigation';
const voterBg = '/voter-with-ballot.jpg';

function LandingComponent() {
    const router = useRouter();
    return (
        <Stack flexGrow={1} gap={10} px={'75px'} py={'15px'} flex={1}>
            <Stack
                flex={1}
                px={10}
                py={4}
                borderRadius={2}
                gap={3}
                justifyContent={'center'}
                alignItems={'center'}
                minHeight={'50vh'}
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

            {/* ----------------------second screen--------------------------- */}
            <Grid container>

                <Grid item xs={6} px={1}>
                    <Typography variant='h4' fontWeight={'bold'} color={'secondary.100'}>
                        The Problem
                    </Typography>

                    <Stack gap={3}>
                        <Typography variant='subtitle1' color={'primary.200'} sx={{ textWrap: 'wrap' }}>
                            Hosting an election in Pakistan is expensive, troublesome and hard to manage. There has been claims for discrepencies, abuse of control and what not which has made the interest in democracy and voter turn out percentage lowest in the decade.
                        </Typography>

                        <Typography variant='subtitle1' color={'primary.200'} sx={{ textWrap: 'wrap' }}>
                            Due to lower turn out rate, the allocated budget of a voter (375 PKR/voter) spikes all the way to 778 PKR/voter. That is more than 50% of increase.
                        </Typography>
                    </Stack>
                </Grid>

                <Grid item overflow={'hidden'} p={1} border={'1px solid'} borderRadius={2} borderColor={'secondary.200'}>
                    <Image
                        src={'/rr-the-economic-and-environmental-cost-of-election-2024-fig-3.png'}
                        width={600}
                        height={300}
                        alt='some data showing voter turnout percentage'
                        style={{ borderRadius: '12px' }}
                    />
                    <Typography variant='caption' textAlign={'center'} width={'100%'}>
                        <Link color={'primary.200'} target='_blank' href='https://pide.org.pk/research/the-economic-and-environmental-cost-of-election-2024/'>
                            Pakistan Institute of Development Economics
                        </Link>
                    </Typography>
                </Grid>

            </Grid>

            {/* -------------------------------------third screen--------------------------- */}
            <Stack direction={'row'} gap={5} justifyContent={'center'} alignItems={'center'} flexWrap={'wrap'}>
                <LandingProfileCards
                    title='Voter Profile'
                    subtitle='Voter Profiles are used to vote for Candidates representing any of the Constituencies and Assemblies.'
                    image={voterBg}
                    children={
                        <>
                            <Button onClick={() => router.push('/user/login')} variant='contained' sx={{ height: 'fit-content' }}>Login</Button>
                            <Button onClick={() => router.push('/user/register')} variant='contained' sx={{ height: 'fit-content' }}>Register</Button>
                        </>
                    }

                />

                <LandingProfileCards
                    title={'Candidate Profile'}
                    subtitle='Candidates need a complete and verified profile to be elected for an Election.'
                    image={voterBg}
                    children={
                        <>
                            <Button onClick={() => router.push('/candidate/login')} variant='contained' sx={{ height: 'fit-content' }}>Login</Button>
                            <Button onClick={() => router.push('/candidate/register')} variant='contained' sx={{ height: 'fit-content' }}>Register</Button>
                        </>
                    }
                />

                <LandingProfileCards
                    title='Admin Profile'
                    subtitle='Admin Profile has the authority to schedule voting session, add constituencies, list political parties and approve candidate profiles.'
                    image={voterBg}
                    children={
                        <>
                            <Button onClick={() => router.push('/admin/login')} variant='contained' sx={{ height: 'fit-content' }}>Login</Button>
                        </>
                    }
                />

            </Stack>


        </Stack >
    )
}

export default LandingComponent