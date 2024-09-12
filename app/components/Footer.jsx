import { Facebook, Twitter, YouTube, } from '@mui/icons-material'
import { Grid, IconButton, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'

function Footer() {
    return (
        <Grid
            backgroundColor={"primary.200"}
            px={"75px"}
            py={"15px"}
        >
            <Grid
                display={"flex"}
                flexDirection={"column"}
                justifyContent={'center'}
                gap={4}
                px={3}
                py={4}
                borderRadius={2}
                bgcolor={'primary.contrastText'}
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
                            sx={{ WebkitTextStroke: '1px black' }}
                        >
                            trust vote
                        </Typography>
                    </Grid>
                    <Grid item={1} display={"flex"} flexDirection={"column"} gap={"30px"}>
                        <Typography variant='h5'>About</Typography>
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
                        <Typography variant='h5'>Help & Support</Typography>
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
                        <Typography variant='h5'>Account</Typography>
                        <Grid
                        >
                            <Link href={"/login"}>
                                <Typography variant='subtitle1' color={"#5A5A5A"}>Login</Typography>
                            </Link>
                            <Link href={"/register"}>
                                <Typography variant='subtitle1' color={"#5A5A5A"}>Register</Typography>
                            </Link>
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>
        </Grid>
    )
}

export default Footer