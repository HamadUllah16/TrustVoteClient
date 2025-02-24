'use client'
import { FormatListBulleted, HowToReg, LogoutOutlined, RecentActors, SettingsOutlined, Verified } from '@mui/icons-material'
import { Box, Divider, MenuItem, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import SidebarMenus from './SidebarMenus'
import { usePathname } from 'next/navigation'

function Sidebar({ children }: { children: React.ReactNode }) {
    const { firstName, lastName, email, role, status, profilePicture } = useSelector((state: RootState) => state.user.userProfile)
    return (
        <Stack
            maxWidth={400}
            width={'fit-content'}
            minHeight={'100%'}
            gap={5}
            py={3}
            className='lg:flex md:hidden sm:hidden max-sm:hidden pr-6 border-r border-[#2B2B2D]'
        >
            <Stack gap={4} minHeight={'50vh'}>
                <Stack
                    direction={'row'}
                    gap={2}
                    alignItems={'center'}
                >
                    <Stack
                        height={100}
                        width={100}
                        borderRadius={'100px'}
                        overflow={'hidden'}
                        border={'5px solid'}
                        borderColor={'primary.main'}
                        position={'relative'}
                    >
                        <Image
                            src={profilePicture ?? '/avatar.jpg'}
                            alt='profile picture'
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    </Stack>
                    <Stack>
                        <Stack
                            direction={'row'}
                            gap={1}
                        >
                            <Typography
                                color={'primary.200'}
                                variant='h6'
                            >
                                {firstName}
                            </Typography>
                            <Typography
                                color={'secondary.200'}
                                variant='h6'
                            >
                                {lastName}
                            </Typography>
                            {status === 'verified' &&
                                <Verified htmlColor='#22BB33' />
                            }

                            {/* <Stack
                                bgcolor={'primary.main'}
                                px={2}
                                py={0.5}
                                borderRadius={1}
                                justifyContent={'center'}
                            >
                                <Typography color={'secondary.100'}>
                                    {role}
                                    </Typography>
                                    </Stack> */}
                        </Stack>
                        <Typography
                            color={'grey'}
                            variant='subtitle1'
                            gap={0}
                        >
                            {email}
                        </Typography>

                        {status &&
                            <Stack
                                textAlign={'center'}
                                borderRadius={0.5}
                                p={0.5}
                                color={status === 'verified' ? 'green' : status === 'pending' ? 'orange' : 'white'}
                                bgcolor={status === 'verified' ? 'lightgreen' : status === 'pending' ? 'lightorange' : '#f44336'}
                            >
                                <Typography>
                                    {status !== '' &&
                                        status === 'verified' ? 'Nominated'
                                        :
                                        status === 'pending' ?
                                            'Pending'
                                            :
                                            'Unverified'
                                    }
                                </Typography>
                            </Stack>
                        }
                    </Stack>

                </Stack>

                <Divider sx={{ borderColor: 'secondary.200' }} />

                {children}

            </Stack>

            <Divider sx={{ borderColor: 'secondary.200' }} />


            <Stack>
                <SidebarMenus
                    navItems={[
                        // { href: '/settings', title: 'Settings', icon: <SettingsOutlined fontSize='medium' /> },
                        { href: '/logout', title: 'Logout', icon: <LogoutOutlined fontSize='medium' /> }
                    ]}
                />
            </Stack>

        </Stack>
    )
}

export default Sidebar