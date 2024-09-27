'use client'
import { Button } from '@mui/material'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

function LandingPageNavItems() {
    const { isAuthenticated, loading } = useSelector((state: RootState) => state.auth)
    const [role, setRole] = useState<string | null>('');
    useEffect(() => {
        const userRole = localStorage.getItem('role')
        setRole(userRole)
    }, [role])
    return (
        <>
            {!isAuthenticated ?

                <>
                    <Link href={'/user/login'}>
                        <Button variant='contained'>
                            Log In
                        </Button>
                    </Link>
                    <Link href={'/user/register'}>
                        <Button variant='outlined'>
                            Sign Up
                        </Button>
                    </Link>
                </>
                :
                <>
                    <Link href={
                        role === 'voter' ?
                            '/user'
                            :
                            role === 'candidate' ?
                                '/candidate'
                                :
                                role === 'admin' ?
                                    '/admin'
                                    :
                                    '/user/login'}
                    >
                        <Button variant='contained'>
                            Home
                        </Button>
                    </Link>
                </>
            }
        </>
    )
}

export default LandingPageNavItems