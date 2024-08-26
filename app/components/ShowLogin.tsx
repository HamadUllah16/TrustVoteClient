'use client'
import React from 'react'
import Login from './Login'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

function ShowLogin() {
    const { showLogin } = useSelector((state: RootState) => state.user);
    return (
        <>
            {showLogin &&
                <Login />
            }
        </>
    )
}

export default ShowLogin