'use client'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Stack, Typography } from '@mui/material'
import Loading from '@/app/components/Loading'
import { getAdminProfile } from '@/app/redux/features/adminSlice'
import { AppDispatch, RootState } from '@/app/redux/store'
import MainWrapper from '@/app/components/MainWrapper'
import AdminSidebar from '@/app/components/AdminComponents/AdminSidebar'

function AdminHomePage() {
    const { userProfile } = useSelector((state: RootState) => state.user)
    const { loading } = useSelector((state: RootState) => state.admin);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(getAdminProfile())
    }, [])
    return (

        <MainWrapper>

            {loading &&
                <Loading />
            }
            <AdminSidebar />

            <Stack flex={1} borderRadius={2} width={'100%'} alignItems={'center'} justifyContent={'center'} bgcolor={'primary.contrastText'}>
                <Typography>
                    Welcome to Trust Vote {userProfile.email}
                </Typography>
            </Stack>

        </MainWrapper>
    )
}

export default AdminHomePage;