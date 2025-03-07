'use client'
import { MenuItem, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

interface navItem {
    href: string,
    title: string,
    icon: React.ReactNode
}

function SidebarMenus({ navItems }: { navItems: navItem[] }) {
    const pathname = usePathname()

    return (
        <Stack>
            {navItems.map((nav: navItem, index: number) => {
                return (
                    <Link href={nav.href} key={index}>
                        <MenuItem
                            sx={{
                                bgcolor: pathname.endsWith(nav.href) ? 'primary.main' : '',
                                border: '1px solid transparent',
                                color: 'secondary.100',
                                display: 'flex',
                                gap: 2,
                                borderRadius: 1,
                                py: 2,
                                ':hover': {
                                    bgcolor: pathname.startsWith(nav.href) ? 'primary.main' : '',
                                    borderColor: pathname.startsWith(nav.href) ? '' : 'secondary.200'
                                }
                            }}>
                            {nav.icon}
                            <Typography variant='body1' display={'flex'} gap={1} alignItems={'center'} >
                                {nav.title}
                            </Typography>
                        </MenuItem>
                    </Link>
                )
            })}
        </Stack>
    )
}

export default SidebarMenus