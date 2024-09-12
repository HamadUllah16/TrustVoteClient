'use client'
import { Button } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

function LandingPageNavItems() {
    const { isAuthenticated, loading } = useSelector((state: RootState) => state.auth)
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
                    <Link href={'/home'}>
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