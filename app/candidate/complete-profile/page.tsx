import CandidateCompletion from '@/app/components/Candidate/CandidateCompletion'
import { Stack } from '@mui/material'
import React from 'react'

function CandidateProfileCompletion() {

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