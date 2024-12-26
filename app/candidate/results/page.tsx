'use client'
import CandidateSidebar from '@/app/components/Candidate/CandidateSidebar'
import ElectionResults from '@/app/components/ElectionResults'
import MainWrapper from '@/app/components/MainWrapper'
import withCompleteCandidateProfile from '@/app/utils/withCompleteCandidateProfile'
import React from 'react'

function ElectionSessionResultsCandidate() {
    return (
        <MainWrapper>
            <CandidateSidebar />

            <ElectionResults />
        </MainWrapper>
    )
}

export default withCompleteCandidateProfile(ElectionSessionResultsCandidate);