'use client'
import CandidateCompletion from '@/app/components/Candidate/CandidateCompletion'
import { allConstituency } from '@/app/redux/features/constituencySlice'
import { AppDispatch } from '@/app/redux/store'
import { Stack } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

function CandidateProfileCompletion() {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(allConstituency());
    }, [])
    return (
        <Stack
            alignItems={'center'}
            width={'100%'}
            justifyContent={'center'}
        >
            <Stack
                bgcolor={'secondary.main'}
                borderRadius={2}
                border={'1px solid'}
                borderColor={'secondary.200'}
                p={4}
            >
                <CandidateCompletion />
            </Stack>
        </Stack>
    )
}

export default CandidateProfileCompletion