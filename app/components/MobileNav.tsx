'use client'
import { Button } from '@mui/material'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

function MobileNav({ navItems }: { navItems: { href: string, title: string, icon: React.ReactNode }[] }) {
    const router = useRouter();
    const pathname = usePathname();
    return (
        <div className='flex fixed left-0 bottom-0 h-20 w-full bg-white bg-opacity-5 backdrop-filter backdrop-blur-md
        lg:hidden md:visible
        '>
            <div className='flex items-center justify-center w-full'>
                {navItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Button
                            key={item.href}
                            onClick={() => router.push(item.href)}
                            variant={isActive ? 'contained' : 'text'}
                            className='w-full h-full rounded-none'
                        >
                            {item.icon}
                        </Button>
                    )
                })}
            </div>
        </div>
    )
}

export default MobileNav