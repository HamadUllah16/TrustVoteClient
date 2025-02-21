"use client"
import { AccountCircleOutlined, HomeOutlined, KeyboardArrowDown, Logout, SettingsOutlined } from '@mui/icons-material'
import { Box, Divider, Grid, IconButton, InputLabel, MenuItem, Stack, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import { logoutUser } from '@/app/redux/features/authSlice';
import Image from 'next/image';

const pfp = '/avatar.jpg'

function ProfileMenu() {
    const { isAuthenticated } = useSelector((state) => state.auth)
    const { firstName, email, role, profilePicture } = useSelector(state => state.user.userProfile)
    const [currentPath, setCurrentPath] = useState();
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

    function getCurrentPath() {
        switch (role) {
            case 'candidate':
                setCurrentPath('/candidate');
                return;
            case 'voter':
                setCurrentPath('/user');
                return;
            case 'admin':
                setCurrentPath('/admin');
                return;
            default:
                '';
                return
        }
    }

    function logoutHandler() {
        dispatch(logoutUser())
        router.push('/logout')
    }

    useEffect(() => {
        getCurrentPath()
        if (show) {
            window.addEventListener('click', handleClickOutside);
        }
    }, [show, role])
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
                                    bgcolor: 'secondary.main',
                                    color: 'secondary.100',
                                    ':hover': {

                                        bgcolor: 'secondary.200',
                                        color: 'secondary.100'
                                    }
                                }}
                                onClick={() => email ? setShow(!show) : router.push('/login')}
                            >
                                {profilePicture ?
                                    <Stack
                                        width={30}
                                        height={30}
                                        borderRadius={0.8}
                                        overflow={'hidden'}
                                        position={'relative'}
                                    >
                                        <Image
                                            src={profilePicture}
                                            alt='a profile picture'
                                            fill
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </Stack>
                                    :
                                    <AccountCircleOutlined />
                                }
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
                                href={`${currentPath}`}
                                onClick={() => setShow(false)}
                                style={{
                                    textDecoration: 'none',
                                }}
                            >
                                <MenuItem
                                    sx={{
                                        borderRadius: 1.5,
                                        backgroundColor: pathName === '/user' ? 'primary.main' : 'secondary.main',
                                        color: 'secondary.100',
                                        ':hover': {
                                            bgcolor: 'secondary.200',
                                        }
                                    }}
                                >
                                    <Grid
                                        display={'flex'}
                                        gap={2}
                                    >
                                        <Stack
                                            width={75}
                                            height={75}
                                            position={'relative'}
                                            borderRadius={2}
                                            overflow={'hidden'}
                                        >
                                            <Image
                                                src={profilePicture}
                                                alt='a profile picture'
                                                style={{ objectFit: 'cover' }}
                                                fill
                                            />
                                        </Stack>

                                        <Stack
                                            justifyContent={'center'}
                                        >
                                            <Typography
                                                variant='body1'
                                                sx={{ display: 'flex', gap: 1, justifyContent: 'space-between', alignItems: 'center' }}
                                            >
                                                {firstName}
                                            </Typography>

                                            <Typography
                                                variant='body2'
                                            >
                                                {email}
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                </MenuItem>
                            </Link>
                            <Divider sx={{ my: 1, borderColor: 'secondary.200' }} />


                            <Link
                                href={`${currentPath}`}
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
                                        backgroundColor: pathName === currentPath ? 'primary.main' : 'secondary.main',
                                        color: 'secondary.100',
                                        ':hover': {

                                            bgcolor: 'secondary.200',
                                        }
                                    }}
                                >
                                    <HomeOutlined fontSize='small' />
                                    <Typography
                                        variant='body1'
                                    >
                                        Home
                                    </Typography>
                                </MenuItem>
                            </Link>

                            <Link
                                href={`${currentPath}/settings/update-profile`}
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
                                        backgroundColor: pathName.endsWith(`${currentPath}/settings/update-profile`) ? 'primary.main' : 'secondary.main',
                                        color: 'secondary.100',
                                        ':hover': {

                                            bgcolor: 'secondary.200',
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

                            {/* <Link
                                href={`${currentPath}/settings`}
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
                                        backgroundColor: pathName.endsWith(`${currentPath}/settings`) ? 'primary.main' : 'secondary.main',
                                        color: 'secondary.100',
                                        ':hover': {

                                            bgcolor: 'secondary.200',
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
                            </Link> */}

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
                                        color: 'secondary.100',
                                        ':hover': {

                                            bgcolor: 'secondary.200',
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