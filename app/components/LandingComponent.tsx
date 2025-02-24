'use client'
import { Button, Grid, Link, Stack, Typography } from '@mui/material'
import React from 'react'
import LandingPageNavItems from './LandingPageNavItems'
import Image from 'next/image'
import LandingProfileCards from './LandingProfileCards';
import { useRouter } from 'next/navigation';

const voterBg = '/voter-with-ballot.jpg';
const solanaLogo = '/solana-sol-logo.png';
const nodeJsLogo = '/nodejs.png';
const nextjsLogo = '/next.svg';
const mongodbLogo = '/mongodb.png'

function LandingComponent() {
    const router = useRouter();
    return (
        <Stack flexGrow={1} gap={10} px={'75px'} py={'15px'} height={'100%'} flex={1}
            className='
            md:px-20 md:py-4
            max-sm:px-4 max-sm:py-8
            sm:px-4 sm:py-8'
        >
            <Stack
                className='h-[80vh] flex-row items-center gap-5 justify-between
                md:flex-row
                sm:flex-col
                max-sm:flex-col
                '
            >
                <Stack
                    // justifyContent={'start'}
                    className='w-full max-w-3xl h-[40vh] gap-10'
                >
                    <div>
                        <Typography variant='h3' fontWeight={'bold'}>
                            Revolutionizing Voting Systems
                        </Typography>
                        <Typography variant='subtitle1' color={'grey'}>
                            Trust Vote is a blockchain powered decentralized electronic voting system designed to ease the process of Voting.
                        </Typography>
                    </div>
                    <div className='flex gap-5'>
                        <Button onClick={() => router.push('/user/login')} variant='contained' size='large'>
                            Register
                        </Button>
                        <Button onClick={() => router.push('/user/register')} size='large' variant='outlined'>
                            Login
                        </Button>
                    </div>
                </Stack>

                <Stack className='h-[40vh] md:w-[50%] sm:w-full max-sm:w-full flex justify-center items-center border border-black/30 rounded-lg bg-black/40 py-2 px-6'>
                    <div className='flex flex-col gap-3'>
                        <Typography variant='h4' fontWeight={'bold'} color={'primary.main'}>
                            Secure.
                        </Typography>
                        <Typography variant='h4' fontWeight={'bold'} color={'primary.main'}>
                            Transparent.
                        </Typography>
                        <Typography variant='h4' fontWeight={'bold'} color={'primary.main'}>
                            Easy.
                        </Typography>
                    </div>
                </Stack>
            </Stack>
            {/* ----------------------second screen--------------------------- */}
            <Stack className='min-h-[50vh] gap-5 justify-between items-center md:flex-row sm:flex-col'>

                <Stack className='md:w-1/2 sm:w-full'>
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
                </Stack>

                <Stack className='md:w-fit sm:w-full h-fit p-2' border={'1px solid'} borderRadius={2} borderColor={'secondary.200'} justifyContent={'center'} alignItems={'center'}>
                    <Image
                        src={'/rr-the-economic-and-environmental-cost-of-election-2024-fig-3.png'}
                        width={600}
                        height={300}
                        alt='some data showing voter turnout percentage'
                        style={{ borderRadius: '12px 12px 0 0' }}
                    />
                    <Typography variant='caption' textAlign={'center'} width={'100%'}>
                        <Link color={'primary.200'} target='_blank' href='https://pide.org.pk/research/the-economic-and-environmental-cost-of-election-2024/'>
                            Pakistan Institute of Development Economics
                        </Link>
                    </Typography>
                </Stack>

            </Stack>

            {/* -------------------------------------third screen--------------------------- */}
            <div className='flex flex-col items-center justify-center gap-5 min-h-[60vh]'>
                <Stack direction={'row'} gap={5} justifyContent={'center'} alignItems={'center'} flexWrap={'wrap'}>
                    <LandingProfileCards
                        title='Voter Profile'
                        subtitle='Voter Profiles are used to vote for Candidates representing any of the Constituencies and Assemblies.'
                        image={voterBg}
                    >
                        <Button onClick={() => router.push('/user/login')} variant='contained' sx={{ height: 'fit-content' }}>Login</Button>
                        <Button onClick={() => router.push('/user/register')} variant='contained' sx={{ height: 'fit-content' }}>Register</Button>
                    </LandingProfileCards>

                    <LandingProfileCards
                        title={'Candidate Profile'}
                        subtitle='Candidates need a complete and verified profile to be elected for an Election.'
                        image={voterBg}
                    >
                        <Button onClick={() => router.push('/candidate/login')} variant='contained' sx={{ height: 'fit-content' }}>Login</Button>
                        <Button onClick={() => router.push('/candidate/register')} variant='contained' sx={{ height: 'fit-content' }}>Register</Button>
                    </LandingProfileCards>


                    <LandingProfileCards
                        title='Admin Profile'
                        subtitle='Admin Profile has the authority to schedule voting session, add constituencies, list political parties and approve candidate profiles.'
                        image={voterBg}
                    >
                        <Button onClick={() => router.push('/admin/login')} variant='contained' sx={{ height: 'fit-content' }}>Login</Button>
                    </LandingProfileCards>

                </Stack>
            </div>

            <Stack className='flex justify-center items-center min-h-[50vh] w-full'>

                <Stack gap={1} className='w-full'>
                    <Typography variant='h4' fontWeight={'bold'} color={'secondary.100'}>
                        Powered by
                    </Typography>
                    <Stack className='flex-row justify-around gap-5 flex-wrap border border-black/30 rounded-lg bg-black/40 py-2 px-6'>
                        <Image
                            src={solanaLogo}
                            height={100}
                            width={100}
                            alt='solana logo'
                        />

                        <Image
                            src={mongodbLogo}
                            height={100}
                            width={300}
                            alt='a mongodb logo'
                        />

                        <Image
                            src={nextjsLogo}
                            height={100}
                            width={300}
                            alt='a nextjs logo'
                        />

                        <Image
                            src={nodeJsLogo}
                            height={50}
                            width={160}
                            alt='a nodejs logo'
                        />


                    </Stack>
                </Stack>

            </Stack>



        </Stack >
    )
}

export default LandingComponent