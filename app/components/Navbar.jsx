"use client"
import { Box, Button, Grid, IconButton, InputLabel, MenuItem, Typography } from '@mui/material'
import React, { useState } from 'react'
import { AccountCircleOutlined, Logout, Settings } from '@mui/icons-material';
import Link from 'next/link';
import ProfileMenu from './ProfileMenu';
import NavItems from './NavItems';
import { useSelector } from 'react-redux';


function Navbar() {
    const { isAuthenticated } = useSelector(state => state.auth)
    const [toggle, setToggle] = useState(false)
    return (
        <Grid
            backgroundColor={"white"}
            px={"75px"}
            py={"15px"}
            transition={"all 0.3s ease"}
            borderBottom={"1px solid #DADADA"}
        >
            <Grid
                container
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
            >
                <Link href={'/'}>
                    <Typography
                        variant='h4'
                        fontWeight={"bold"}
                        p={1}
                    >
                        TRUSTxVOTE
                    </Typography>
                </Link>

                <Grid
                    display={"flex"}
                    // flexDirection={"column"}
                    gap={3}
                    alignItems={'center'}
                    position={'relative'}
                >
                    <NavItems />
                    {isAuthenticated &&
                        <>
                            <ProfileMenu />
                            <Grid
                                position={'absolute'}
                                display={'flex'}
                                p={1}
                                flexDirection={'column'}
                                top={50}
                                left={-100}
                                border={'1px solid #DADADA'}
                                borderRadius={4}
                                overflow={'hidden'}
                                sx={{
                                    transform: toggle ? 'scale(1)' : 'scale(0)',
                                    transition: '0.2s all',
                                    backgroundColor: 'primary.contrastText'
                                }}
                            >
                                <MenuItem
                                    sx={{
                                        display: "flex",
                                        gap: 1,
                                        borderRadius: 2
                                    }}
                                >
                                    Name
                                </MenuItem>
                                <MenuItem
                                    sx={{
                                        display: "flex",
                                        gap: 1,
                                        borderRadius: 2
                                    }}
                                >
                                    <Settings /> Settings
                                </MenuItem>
                                <MenuItem
                                    sx={{
                                        display: "flex",
                                        gap: 1,
                                        borderRadius: 2
                                    }}
                                ><Logout /> Logout</MenuItem>
                            </Grid>
                        </>
                    }
                </Grid>

            </Grid>
        </Grid >
    )
}

export default Navbar