'use client'
import CandidateSidebar from '@/app/components/Candidate/CandidateSidebar'
import CandidateVoteCount from '@/app/components/Candidate/CandidateVoteCount'
import ProfileStats from '@/app/components/Candidate/ProfileStats'
import MainWrapper from '@/app/components/MainWrapper'
import PageHeader from '@/app/components/PageHeader'
import withAuth from '@/app/utils/withAuth'
import React from 'react'

function MyCandidateProfile() {
    return (
        <MainWrapper>
            <CandidateSidebar />

            <PageHeader
                title='My Profile'
                subtitle=''
                action={null}
            >
                <ProfileStats />

                <CandidateVoteCount />



            </PageHeader>


        </MainWrapper>
    )
}

export default withAuth(MyCandidateProfile)