'use client'
import React from 'react'
import Login from './Login'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import Modal from './Modal'

function ShowLogin() {
    const { showLogin } = useSelector((state: RootState) => state.user);
    return (
        <>
            {showLogin &&
                <Modal>
                    <Login />
                </Modal>
            }
        </>
    )
}

export default ShowLogin