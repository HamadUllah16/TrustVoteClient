'use client'
import { Grid, IconButton, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { useSelector } from 'react-redux'

function Footer() {
    const { firstName } = useSelector((state) => state.user.userProfile);
    const pathName = usePathname();
    return (
        <>
            {
                pathName.startsWith('/user/register')
                    ||
                    pathName.startsWith('/user/login')
                    ||
                    pathName.startsWith('/candidate/register')
                    ||
                    pathName.startsWith('/candidate/login')
                    ?

                    null
                    :
                    <Stack
                        backgroundColor={"background"}
                        bgcolor={'secondary.main'}
                        className='px-20 py-7 flex-row'
                    >

                        <Stack
                            display={"flex"}
                            justifyContent={"space-between"}
                            className='
                                md:justify-start md:flex-row
                                sm:justify-center sm:flex-col sm:gap-5
                                max-sm:justify-center max-sm:flex-col max-sm:gap-5
                                w-full
                                '
                        >
                            <Stack className={'md:w-[25%] sm:w-full max-sm:w-full '}>
                                <Typography
                                    variant='h4'
                                    fontWeight={"bolder"}
                                    color={'primary.main'}
                                    p={1}
                                    className='md:text-start sm:text-center max-sm:text-center'
                                >
                                    Trust Vote
                                </Typography>
                            </Stack>
                            <Stack className={'md:w-[25%] sm:w-full max-sm:w-full '}>
                                <Typography variant='h5' color={'secondary.100'}>About</Typography>
                                <Grid
                                >
                                    <Link href={"#privacypolicy"}>
                                        <Typography variant='subtitle1' color={"#5A5A5A"}>Privacy Policy</Typography>
                                    </Link>
                                    <Link href={"#contact"}>
                                        <Typography variant='subtitle1' color={"#5A5A5A"}>Contact</Typography>
                                    </Link>
                                    <Link href={"#careers"}>
                                        <Typography variant='subtitle1' color={"#5A5A5A"}>Careers</Typography>
                                    </Link>
                                    <Link href={"terms"}>
                                        <Typography variant='subtitle1' color={"#5A5A5A"}>Terms of Service</Typography>
                                    </Link>
                                </Grid>
                            </Stack>

                            <Stack className={'md:w-[25%] sm:w-full max-sm:w-full '}>
                                <Typography variant='h5' color={'secondary.100'}>Help & Support</Typography>
                                <Grid
                                >
                                    <Link href={"#faqs"}>
                                        <Typography variant='subtitle1' color={"#5A5A5A"}>FAQs</Typography>
                                    </Link>
                                    <Link href={"#email"}>
                                        <Typography variant='subtitle1' color={"#5A5A5A"}>help@trustvote.com</Typography>
                                    </Link>
                                    <Link href={"#phone"}>
                                        <Typography variant='subtitle1' color={"#5A5A5A"}>+921234567890</Typography>
                                    </Link>
                                </Grid>
                            </Stack>

                            <Stack className={'md:w-[25%] sm:w-full max-sm:w-full '}>
                                <Typography variant='h5' color={'secondary.100'}>Account</Typography>
                                <Grid
                                >
                                    <Link href={firstName ? '/user/dashboard' : "/login"}>
                                        <Typography variant='subtitle1' color={"#5A5A5A"}>{firstName ?? 'Login'}</Typography>
                                    </Link>
                                    {firstName ? null :
                                        <Link href={"/register"}>
                                            <Typography variant='subtitle1' color={"#5A5A5A"}>Register</Typography>
                                        </Link>
                                    }
                                </Grid>
                            </Stack>

                        </Stack>
                    </Stack>
            }
        </>
    )
}

export default Footer