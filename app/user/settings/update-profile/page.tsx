'use client'
import React from 'react'
import UserUpdateProfile from '@/app/components/UserComponents/UserUpdateProfile';
import withAuth from '@/app/utils/withAuth';

function UpdateProfile() {
    return (
        <UserUpdateProfile />
    )
}

export default withAuth(UpdateProfile)