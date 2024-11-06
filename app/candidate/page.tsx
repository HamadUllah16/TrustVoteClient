'use client'
import React, { useEffect } from 'react'
import { Typography, Stack } from "@mui/material";
import Sidebar from "../components/Sidebar";
import Loading from "../components/Loading";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from 'react-redux';
import withCompleteCandidateProfile from '../utils/withCompleteCandidateProfile';
import { getCandidateProfile } from '../redux/features/candidateSlice';
import MainWrapper from '../components/MainWrapper';
import CandidateSidebar from '../components/Candidate/CandidateSidebar';

function CandidateHome() {
    const { userProfile } = useSelector((state: RootState) => state.user);
    const { loading } = useSelector((state: RootState) => state.candidate);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(getCandidateProfile());
    }, [])
    return (
        <MainWrapper>
            <CandidateSidebar />

            <Stack direction={'row'} px={'75px'} py={'15px'} gap={4} flex={1}>
                {loading &&
                    <Loading />
                }
                <Stack flex={1} borderRadius={2} width={'100%'} alignItems={'center'} justifyContent={'center'} bgcolor={'primary.contrastText'}>
                    <Typography>
                        Welcome to Trust Vote <span style={{ textDecoration: 'underline', fontWeight: 'bold' }}>{userProfile.email}</span>
                    </Typography>
                </Stack>
            </Stack>
        </MainWrapper>
    )
}

export default withCompleteCandidateProfile(CandidateHome)