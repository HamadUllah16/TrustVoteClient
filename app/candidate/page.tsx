'use client'
import React, { useEffect } from 'react'
import { Stack } from "@mui/material";
import { AppDispatch } from "../redux/store";
import { useDispatch } from 'react-redux';
import withCompleteCandidateProfile from '../utils/withCompleteCandidateProfile';
import { getCandidateProfile } from '../redux/features/candidateSlice';
import MainWrapper from '../components/MainWrapper';
import CandidateSidebar from '../components/Candidate/CandidateSidebar';
import ProfileStats from '../components/Candidate/ProfileStats';
import CandidateVoteCount from '../components/Candidate/CandidateVoteCount';

function CandidateHome() {
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(getCandidateProfile());
    }, [])
    return (
        <MainWrapper>
            <CandidateSidebar />

            <Stack py={2} gap={4} flex={1}>
                <ProfileStats />
                <CandidateVoteCount />

            </Stack>
        </MainWrapper>
    )
}

export default withCompleteCandidateProfile(CandidateHome)