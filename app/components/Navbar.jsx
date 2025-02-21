'use client';
import { Grid, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ProfileMenu from './ProfileMenu';
import NavItems from './NavItems';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../redux/features/userSlice';
import { getCandidateProfile, updateCandidateVote } from '../redux/features/candidateSlice';
import { getAdminProfile } from '../redux/features/adminSlice';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import socket from './Utils/socket';

function Navbar() {
    const { isAuthenticated } = useSelector((state) => state.auth);
    const userProfile = useSelector((state) => state.user.userProfile);
    const dispatch = useDispatch();
    const pathName = usePathname();

    useEffect(() => {
        // Listen for vote count updates
        socket.on('updateVoteCount', (data) => {
            const { voterId, candidateId } = data;
            dispatch(updateCandidateVote(data))
            console.log('Received updated vote:', data);
        });

        // Cleanup listener on component unmount
        return () => {
            socket.off('updateVoteCount');
        };
    }, []);


    useEffect(() => {
        const token = localStorage.getItem('x_auth_token');
        const role = localStorage.getItem('role');
        if (token && userProfile.email === '') {
            if (role === 'voter') {
                dispatch(getUserProfile());
            } else if (role === 'candidate') {
                dispatch(getCandidateProfile());
            } else if (role === 'admin') {
                dispatch(getAdminProfile());
            }
        }
    }, [isAuthenticated, userProfile.email, dispatch]);

    return (
        <>
            {pathName.startsWith('/user/register') ||
                pathName.startsWith('/user/login') ||
                pathName.startsWith('/candidate/register') ||
                pathName.startsWith('/candidate/login') ? null : (
                <Stack
                    py={4}
                >

                    <Stack
                        position={'fixed'}
                        top={0}
                        width={'100%'}
                        zIndex={10}
                        transition={'all 0.3s ease'}
                        className='bg-white bg-opacity-5 backdrop-filter backdrop-blur-md
                        md:px-20 md:py-4
                        sm:px-4 sm:py-4
                        max-sm:px-4 max-sm:py-4
                        '
                    >
                        <Stack
                            container
                            className='flex flex-row justify-between gap-5'
                        >
                            <Link href={'/'}>
                                <Image
                                    src={'/logo-dark.jpg'}
                                    width={50}
                                    height={50}
                                    alt='logo'
                                    style={{
                                        borderRadius: '12px',
                                        rotate: '90deg',
                                    }}
                                />
                            </Link>

                            <Grid display={'flex'} gap={3} alignItems={'center'} position={'relative'}>

                                {/* Navigation Items */}
                                <NavItems />

                                {/* User Profile Menu */}
                                {isAuthenticated && <ProfileMenu />}
                            </Grid>
                        </Stack>
                    </Stack>
                </Stack>
            )}
        </>
    );
}

export default Navbar;
