'use client'
import React from 'react'
import { Typography, Stack } from "@mui/material";
import Sidebar from "../components/Sidebar";
import Loading from "../components/Loading";
import { RootState } from "../redux/store";
import { useSelector } from 'react-redux';
import CandidateSidebarMenus from '../components/Candidate/CandidateSidebarMenus';
import withCompleteCandidateProfile from '../utils/withCompleteCandidateProfile';

function CandidateHome() {
    const { userProfile } = useSelector((state: RootState) => state.user);
    const { loading } = useSelector((state: RootState) => state.candidate);
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