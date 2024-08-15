"use client"
import { AccountCircleOutlined } from '@mui/icons-material'
import { Grid, IconButton, InputLabel, MenuItem } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import { logoutUser } from '@/app/redux/features/authSlice';

function ProfileMenu() {
    const { userProfile } = useSelector((state) => state.user)
    const [show, setShow] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch();
    const ref = useRef(null)
    const pathName = usePathname();
    const paths = [
        { path: '/user/dashboard', label: 'Dashboard' },
        { path: '/update-profile', label: 'Edit Profile' },
        { path: '/user/settings', label: 'Settings' }
    ]

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
        <Grid
            display={"flex"}
            flexDirection={"column"}
            position={'relative'}
            ref={ref}
        >

            <InputLabel
                sx={{
                    color: "black",
                    fontSize: "15px",
                    height: "fit-content",
                    width: "fit-content",
                    lineHeight: "1.2rem",
                }}
                id="demo-simple-select-label">
                <IconButton

                    onClick={() => userProfile.email ? setShow(!show) : router.push('/user/login')}
                >
                    <AccountCircleOutlined />
                </IconButton>
            </InputLabel>
            <Grid
                position={'absolute'}
                zIndex={1000}
                display={'flex'}
                flexDirection={'column'}
                top={50}
                left={-50}
                border={'1px solid #DADADA'}
                borderRadius={4}
                width={'fit-content'}
                overflow={'hidden'}
                sx={{
                    transform: `scale(${show ? 1 : 0})`,
                    opacity: `${show ? 1 : 0}`,
                    transition: '0.2s all',
                    transitionDelay: '0.1s',
                    backgroundColor: 'primary.contrastText',
                    p: 1
                }}
            >
                <MenuItem
                    sx={{
                        borderRadius: 3
                    }}
                >
                    {userProfile.firstName}
                </MenuItem>

                {paths.map((item) => {
                    const activePath = pathName.startsWith(item.path);
                    return (
                        <Link
                            key={item.label}
                            href={item.path}
                            style={{
                                textDecoration: 'none',
                                color: 'black',
                            }}
                        >
                            <MenuItem
                                sx={{
                                    borderRadius: 3,
                                    backgroundColor: activePath && 'primary.main',
                                    color: activePath && 'primary.contrastText',
                                    ':hover': {
                                        color: 'black'
                                    }
                                }}
                            >
                                {item.label}
                            </MenuItem>
                        </Link>

                    )
                })}

                <MenuItem
                    sx={{
                        borderRadius: 3
                    }}
                    onClick={logoutHandler} >Logout</MenuItem>
            </Grid>
        </Grid>
    )
}

export default ProfileMenu