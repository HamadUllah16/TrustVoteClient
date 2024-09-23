'use client'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Stack, Typography } from '@mui/material'
import Loading from '@/app/components/Loading'
import Sidebar from '@/app/components/Sidebar'
import AdminRoutes from '@/app/components/AdminComponents/AdminRoutes'
import { getAdminProfile } from '@/app/redux/features/adminSlice'
import { AppDispatch, RootState } from '@/app/redux/store'

function AdminHomePage() {
    const { userProfile } = useSelector((state: RootState) => state.user)
    const { loading } = useSelector((state: RootState) => state.admin);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(getAdminProfile())
    }, [])
    return (
        <Stack direction={'row'} px={'75px'} py={'15px'} gap={4} flex={1}>
            {loading &&
                <Loading />
            }
            <Sidebar>
                <AdminRoutes />
            </Sidebar>
            <Stack flex={1} borderRadius={2} width={'100%'} alignItems={'center'} justifyContent={'center'} bgcolor={'primary.contrastText'}>
                <Typography>
                    Welcome to Trust Vote <span style={{ textDecoration: 'underline', fontWeight: 'bold' }}>{userProfile.email}</span>
                </Typography>
            </Stack>
        </Stack>
    )
}

export default AdminHomePage;