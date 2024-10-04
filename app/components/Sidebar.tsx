'use client'
import { FormatListBulleted, HowToReg, LogoutOutlined, RecentActors, SettingsOutlined } from '@mui/icons-material'
import { Box, Divider, MenuItem, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

function Sidebar({ children }: { children: React.ReactNode }) {
    const { firstName, lastName, email, role, status } = useSelector((state: RootState) => state.user.userProfile)
    return (
        <Stack
            minWidth={400}
            minHeight={'100%'}
            gap={5}
            py={3}
        >
            <Stack gap={4} minHeight={'50vh'}>
                <Stack
                    direction={'row'}
                    gap={2}
                    alignItems={'center'}
                >
                    <Box
                        maxHeight={80}
                        maxWidth={80}
                        borderRadius={'100px'}
                        overflow={'hidden'}
                    >
                        <Image
                            src={'/avatar.jpg'}
                            alt='profile picture'
                            width={100}
                            height={100}
                        />
                    </Box>
                    <Stack>
                        <Stack
                            direction={'row'}
                            gap={1}
                            justifyContent={'space-between'}
                        >
                            <Typography
                                color={'grey'}
                                variant='h6'
                            >
                                {firstName}
                            </Typography>

                            <Stack
                                bgcolor={role === 'voter' ? 'primary.100' : 'secondary.main'}
                                px={2}
                                py={0.2}
                                borderRadius={2}
                                justifyContent={'center'}
                            >
                                <Typography color={role === 'voter' ? 'secondary.200' : 'primary.contrastText'}>
                                    {role}
                                </Typography>
                            </Stack>
                        </Stack>
                        <Typography
                            color={'grey'}
                            variant='subtitle1'
                            gap={0}
                        >
                            {email}
                        </Typography>

                        {status &&
                            <Stack textAlign={'center'} borderRadius={0.5} p={0.5} color={'white'} bgcolor={status === 'approved' ? '#008cff' : 'orange'}>
                                <Typography>
                                    {status !== '' &&
                                        status === 'approved' ? 'Nominated'
                                        :
                                        'Pending'
                                    }
                                </Typography>
                            </Stack>
                        }
                    </Stack>

                </Stack>

                <Divider />

                {children}

            </Stack>

            <Divider />


            <Stack>
                <Link href={'/settings'}>
                    <MenuItem sx={{ borderRadius: 1, gap: 2 }}>
                        <SettingsOutlined fontSize='medium' sx={{ color: 'secondary.100' }} />
                        <Typography variant='subtitle1' color={'secondary.100'} display={'flex'} gap={1} alignItems={'center'} >
                            Settings
                        </Typography>
                    </MenuItem>
                </Link>
                <Link href={'/logout'}>
                    <MenuItem sx={{ borderRadius: 1, gap: 2 }}>
                        <LogoutOutlined fontSize='medium' sx={{ color: 'secondary.100' }} />
                        <Typography variant='subtitle1' color={'secondary.100'} display={'flex'} gap={1} alignItems={'center'} >
                            Logout
                        </Typography>
                    </MenuItem>
                </Link>
            </Stack>

        </Stack>
    )
}

export default Sidebar