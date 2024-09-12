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
                bgcolor={'primary.contrastText'}
                borderRadius={2}
                p={4}
            >
                <CandidateCompletion />
            </Stack>
        </Stack>
    )
}

export default CandidateProfileCompletion