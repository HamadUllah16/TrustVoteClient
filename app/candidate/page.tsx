'use client'
import React, { useEffect } from 'react'
import { Typography, Stack } from "@mui/material";
import Sidebar from "../components/Sidebar";
import Loading from "../components/Loading";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from 'react-redux';
import CandidateSidebarMenus from '../components/Candidate/CandidateSidebarMenus';
import withCompleteCandidateProfile from '../utils/withCompleteCandidateProfile';
import { getCandidateProfile } from '../redux/features/candidateSlice';

function CandidateHome() {
    const { userProfile } = useSelector((state: RootState) => state.user);
    const { loading } = useSelector((state: RootState) => state.candidate);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(getCandidateProfile());
    }, [])
    return (
        <Stack direction={'row'} px={'75px'} py={'15px'} gap={4} flex={1}>
            {loading &&
                <Loading />
            }
            <Sidebar>
                <CandidateSidebarMenus />
            </Sidebar>
            <Stack flex={1} borderRadius={2} width={'100%'} alignItems={'center'} justifyContent={'center'} bgcolor={'primary.contrastText'}>
                <Typography>
                    Welcome to Trust Vote <span style={{ textDecoration: 'underline', fontWeight: 'bold' }}>{userProfile.email}</span>
                </Typography>
            </Stack>
        </Stack>
    )
}

export default withCompleteCandidateProfile(CandidateHome)