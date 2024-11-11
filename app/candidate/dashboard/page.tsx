'use client'
import CandidateSidebar from '@/app/components/Candidate/CandidateSidebar';
import CandidateSidebarMenus from '@/app/components/Candidate/CandidateSidebar';
import Loading from '@/app/components/Loading';
import MainWrapper from '@/app/components/MainWrapper';
import Sidebar from '@/app/components/Sidebar';
import { getCandidateProfile } from '@/app/redux/features/candidateSlice';
import { AppDispatch, RootState } from '@/app/redux/store';
import withCompleteCandidateProfile from '@/app/utils/withCompleteCandidateProfile';
import { Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

function DashboardPage() {
    const { userProfile } = useSelector((state: RootState) => state.user);
    const { loading } = useSelector((state: RootState) => state.candidate);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getCandidateProfile());
    }, [])
    return (
        <MainWrapper>

            <CandidateSidebar />

            <Stack flex={1} borderRadius={2} width={'100%'} alignItems={'center'} justifyContent={'center'} bgcolor={'primary.contrastText'}>
                <Typography>
                    Welcome to Trust Vote <span style={{ textDecoration: 'underline', fontWeight: 'bold' }}>{userProfile.email}</span>
                </Typography>
            </Stack>

        </MainWrapper>
    )
}

export default withCompleteCandidateProfile(DashboardPage)