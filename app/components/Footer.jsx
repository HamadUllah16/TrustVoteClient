'use client'
import { Grid, IconButton, Typography } from '@mui/material'
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
                    <Grid
                        backgroundColor={"background"}
                        px={"75px"}
                        py={"30px"}
                        bgcolor={'secondary.main'}
                    >
                        <Grid
                            display={"flex"}
                            flexDirection={"column"}
                            justifyContent={'center'}
                            gap={4}
                            px={3}
                            py={4}
                        >

                            <Grid
                                display={"flex"}
                                justifyContent={"space-between"}
                            >
                                <Grid item={1} display={"flex"} alignItems={"center"}>
                                    <Typography
                                        variant='h4'
                                        fontWeight={"bolder"}
                                        color={'primary.main'}
                                        p={1}
                                    >
                                        Trust Vote
                                    </Typography>
                                </Grid>
                                <Grid item={1} display={"flex"} flexDirection={"column"} gap={"30px"}>
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
                                </Grid>

                                <Grid item={1} display={"flex"} flexDirection={"column"} gap={"30px"}>
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
                                </Grid>

                                <Grid item={1} display={"flex"} flexDirection={"column"} gap={"30px"}>
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
                                </Grid>

                            </Grid>
                        </Grid>
                    </Grid>
            }
        </>
    )
}

export default Footer