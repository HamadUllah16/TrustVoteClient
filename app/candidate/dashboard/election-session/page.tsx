'use client'
import CandidateSidebar from '@/app/components/Candidate/CandidateSidebar'
import ElectionSessionStatus from '@/app/components/ElectionSessionStatus'
import MainWrapper from '@/app/components/MainWrapper'
import PageHeader from '@/app/components/PageHeader'
import withAuth from '@/app/utils/withAuth'
import React from 'react'

function CandidateElectionSessionPage() {
    return (
        <MainWrapper>
            <CandidateSidebar />

            <PageHeader
                action={null}
                title='Election Session'
                subtitle='Active election sessions are listed below.'
            >
                <ElectionSessionStatus />
            </PageHeader>
        </MainWrapper>
    )
}

export default withAuth(CandidateElectionSessionPage)