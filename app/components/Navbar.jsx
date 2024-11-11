"use client"
import { Grid, Stack } from '@mui/material'
import React, { useEffect } from 'react'
import Link from 'next/link';
import ProfileMenu from './ProfileMenu';
import NavItems from './NavItems';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../redux/features/userSlice';
import { getCandidateProfile } from '../redux/features/candidateSlice';
import { getAdminProfile } from '../redux/features/adminSlice';
import { usePathname } from 'next/navigation';
import Image from 'next/image';


function Navbar() {
    const { isAuthenticated } = useSelector(state => state.auth)
    const userProfile = useSelector(state => state.user.userProfile)
    const dispatch = useDispatch();
    const pathName = usePathname();


    useEffect(() => {
        const token = localStorage.getItem('x_auth_token');
        const role = localStorage.getItem('role');
        if (token && userProfile.email === '') {
            if (role === 'voter') {
                dispatch(getUserProfile())
            }
            else if (role === 'candidate') {
                dispatch(getCandidateProfile())
            }
            else if (role === 'admin') {
                dispatch(getAdminProfile());
            }
        }
    }, [isAuthenticated])
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
                        bgcolor={'background'}
                        px={"75px"}
                        py={"15px"}
                        transition={"all 0.3s ease"}
                    >
                        <Grid
                            container
                            borderRadius={2}
                            display={"flex"}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                        >
                            <Link href={'/'}>
                                <Image
                                    src={'/logo-dark.jpg'}
                                    width={50}
                                    height={50}
                                    alt='logo'
                                    style={{
                                        borderRadius: '12px',
                                        rotate: '90deg'
                                    }}
                                />
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
            }
        </>
    )
}

export default Navbar