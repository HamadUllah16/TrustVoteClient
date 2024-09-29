"use client"
import { AccountCircleOutlined, FavoriteBorder, KeyboardArrowDown, Logout, Menu, SettingsOutlined, ShoppingCart } from '@mui/icons-material'
import { Box, Button, Divider, Grid, IconButton, InputLabel, MenuItem, Stack, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import { logoutUser } from '@/app/redux/features/authSlice';
import Image from 'next/image';

const pfp = '/avatar.jpg'

function ProfileMenu() {
    const { isAuthenticated } = useSelector((state) => state.auth)
    const { firstName, email, role } = useSelector(state => state.user.userProfile)
    const [show, setShow] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch();
    const ref = useRef(null)
    const pathName = usePathname();

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setShow(false);
        }
    };

    function logoutHandler() {
        dispatch(logoutUser())
        router.push('/logout')
    }

    useEffect(() => {
        if (show) {
            window.addEventListener('click', handleClickOutside);
        }
    }, [show])
    return (
        <>
            {isAuthenticated &&
                <>
                    <Grid
                        display={"flex"}
                        flexDirection={"column"}
                        position={'relative'}
                        ref={ref}
                    >

                        <InputLabel
                            sx={{
                                fontSize: "15px",
                                height: "fit-content",
                                width: "fit-content",
                                lineHeight: "1.2rem",
                            }}
                            id="demo-simple-select-label">
                            <IconButton
                                sx={{
                                    border: '1px solid',
                                    borderColor: 'secondary.200',
                                    borderRadius: 1.5,
                                    gap: 1,
                                    bgcolor: 'secondary.100',
                                    ':hover': {
                                        bgcolor: 'secondary.200'
                                    }
                                }}
                                onClick={() => email ? setShow(!show) : router.push('/login')}
                            >
                                <AccountCircleOutlined />
                                <Typography display={{ xs: 'none', md: 'block' }}
                                >
                                    {firstName ? firstName : email}
                                </Typography>
                                <KeyboardArrowDown sx={{
                                    rotate: show ? '180deg' : '0',
                                    transition: '0.3s all ease'
                                }}
                                />
                            </IconButton>
                        </InputLabel>
                        <Grid
                            position={'absolute'}
                            zIndex={1000}
                            gap={0.3}
                            flexDirection={'column'}
                            top={50}
                            right={0}
                            border={'1px solid'}
                            borderColor={'secondary.200'}
                            borderRadius={2}
                            width={'fit-content'}
                            overflow={'hidden'}
                            sx={{
                                transform: `scale(${show ? 1 : 0})`,
                                opacity: `${show ? 1 : 0}`,
                                transition: '0.2s all',
                                transitionDelay: '0.1s',
                                backgroundColor: 'secondary.main',
                                p: 1
                            }}
                        >
                            <Link
                                href={'/user/dashboard'}
                                onClick={() => setShow(false)}
                                style={{
                                    textDecoration: 'none',
                                }}
                            >
                                <MenuItem
                                    sx={{
                                        borderRadius: 1.5,
                                        backgroundColor: pathName.startsWith('/user/dashboard') ? 'primary.main' : 'secondary.main',
                                        color: pathName.startsWith('/user/dashboard') ? 'secondary.200' : 'primary.100',
                                        ':hover': {
                                            color: 'primary.100'
                                        }
                                    }}
                                >
                                    <Grid
                                        display={'flex'}
                                        gap={3}
                                    >
                                        <Box
                                            height={'50px'}
                                            maxWidth={'100px'}
                                            borderRadius={'100px'}
                                            sx={{
                                                backgroundColor: '#DADADA',
                                                objectFit: 'contain',
                                                overflow: 'hidden',
                                            }}
                                            display={'flex'}
                                            justifyContent={'center'}
                                            alignItems={'center'}
                                        >
                                            <Image
                                                src={'/avatar.jpg'}
                                                height={50}
                                                width={50}
                                                style={{ maxWidth: '100px', height: 'auto' }}
                                                alt='a pfp'
                                            />
                                        </Box>

                                        <Box
                                            display={'flex'}
                                            flexDirection={'column'}
                                        >
                                            <Typography
                                                variant='body1'
                                                sx={{ display: 'flex', gap: 1, justifyContent: 'space-between', alignItems: 'center' }}
                                            >
                                                {firstName}
                                                <Stack borderRadius={2} bgcolor={'primary.main'} px={2} py={0.2}>
                                                    {role}
                                                </Stack>
                                            </Typography>

                                            <Typography
                                                variant='body2'
                                            >
                                                {email}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </MenuItem>
                            </Link>
                            <Divider sx={{ my: 1, borderColor: 'secondary.200' }} />

                            <Link
                                href={'/user/update-profile'}
                                onClick={() => setShow(false)}
                                style={{
                                    textDecoration: 'none',
                                    color: 'primary.main',
                                }}
                            >
                                <MenuItem
                                    sx={{
                                        display: 'flex',
                                        gap: 2,
                                        alignItems: 'center',
                                        borderRadius: 1,
                                        backgroundColor: pathName.startsWith('/user/update-profile') ? 'primary.main' : 'secondary.main',
                                        color: pathName.startsWith('/user/update-profile') ? 'secondary.200' : 'primary.100',
                                        ':hover': {
                                            color: 'primary.100'
                                        }
                                    }}
                                >
                                    <AccountCircleOutlined fontSize='small' />
                                    <Typography
                                        variant='body1'
                                    >
                                        Edit Profile
                                    </Typography>
                                </MenuItem>
                            </Link>

                            <Link
                                href={'/user/settings'}
                                onClick={() => setShow(false)}
                                style={{
                                    textDecoration: 'none',
                                    color: 'primary.main',
                                }}
                            >
                                <MenuItem
                                    sx={{
                                        display: 'flex',
                                        gap: 2,
                                        alignItems: 'center',
                                        borderRadius: 1,
                                        backgroundColor: pathName.startsWith('/user/settings') ? 'primary.main' : 'secondary.main',
                                        color: pathName.startsWith('/user/settings') ? 'secondary.200' : 'primary.100',
                                        ':hover': {
                                            color: 'primary.100'
                                        }
                                    }}
                                >
                                    <SettingsOutlined fontSize='small' />
                                    <Typography
                                        variant='body1'
                                    >
                                        Settings
                                    </Typography>
                                </MenuItem>
                            </Link>
                            <Link
                                href={'/logout'}
                                onClick={() => setShow(false)}
                                style={{
                                    textDecoration: 'none',
                                    color: 'primary.main',
                                }}
                            >
                                <MenuItem
                                    onClick={logoutHandler}
                                    sx={{
                                        display: 'flex',
                                        gap: 2,
                                        alignItems: 'center',
                                        borderRadius: 1,
                                        backgroundColor: pathName.startsWith('/logout') ? 'primary.main' : 'secondary.main',
                                        color: pathName.startsWith('/logout') ? 'secondary.200' : 'primary.100',
                                        ':hover': {
                                            color: 'primary.100'
                                        }
                                    }}
                                >
                                    <Logout fontSize='small' />
                                    <Typography
                                        variant='body1'
                                    >
                                        Logout
                                    </Typography>
                                </MenuItem>
                            </Link>
                        </Grid>
                    </Grid >
                </>
            }
        </>
    )
}

export default ProfileMenu