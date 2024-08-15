'use client'

import React, { useEffect } from 'react'
import Modal from '../components/Modal';
import Loading from '../components/Loading';

function LogoutUser() {
    useEffect(() => {
        const token = localStorage.getItem('x_auth_token');
        if (token) {
            localStorage.clear();
            window.location.href = '/';
        }
    }, [])
    return (
        <Modal>
            <Loading />
        </Modal>
    )
}

export default LogoutUser