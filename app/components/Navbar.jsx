"use client"
import { Grid, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import ProfileMenu from './ProfileMenu';
import NavItems from './NavItems';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../redux/features/userSlice';


function Navbar() {
    const { isAuthenticated } = useSelector(state => state.auth)
    const userProfile = useSelector(state => state.user.userProfile)
    const dispatch = useDispatch();


    useEffect(() => {
        const token = localStorage.getItem('x_auth_token');
        if (token) {
            dispatch(getUserProfile())
        }
    }, [isAuthenticated])
    return (
        <Stack
            bgcolor={'primary.200'}
            px={"75px"}
            py={"15px"}
            transition={"all 0.3s ease"}
        >
            <Grid
                container
                bgcolor='primary.contrastText'
                borderRadius={2}
                px={2}
                py={1}
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
            >
                <Link href={'/'}>
                    <Typography
                        variant='h4'
                        fontWeight={"bolder"}
                        color={'primary.main'}
                        p={1}
                        sx={{ WebkitTextStroke: '1px black' }}
                    >
                        trust vote
                    </Typography>
                </Link>

                <Grid
                    display={"flex"}
                    // flexDirection={"column"}
                    gap={3}
                    alignItems={'center'}
                    position={'relative'}
                >

                    {/* Login Register for non-auth */}
                    <NavItems />



                    {isAuthenticated &&
                        <>
                            <ProfileMenu />
                        </>
                    }
                </Grid>

            </Grid>
        </Stack>
    )
}

export default Navbar