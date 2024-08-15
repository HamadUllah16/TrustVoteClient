'use client'
import { Box, Button } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

function NavItems() {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth)
    return (
        <Box
            display={"flex"}
            gap={2}
        >
            {
                isAuthenticated ?
                    <>
                        <Link href={'/cast-a-vote'}>
                            <Button
                                variant='outlined'>
                                Cast Vote
                            </Button>
                        </Link>
                        <Link href={'/logout'}>

                            <Button
                                variant='outlined'>
                                Logout
                            </Button>
                        </Link>
                    </>

                    :
                    <>
                        <Link href={'/user/login'}>

                            <Button
                                variant='outlined'>
                                Login
                            </Button>
                        </Link>

                        <Link href={'/user/register'}>
                            <Button
                                variant='outlined'>
                                Register
                            </Button>
                        </Link>
                    </>
            }
        </Box>
    )
}

export default NavItems