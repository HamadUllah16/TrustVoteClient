import CandidateSidebar from '@/app/components/Candidate/CandidateSidebar'
import ProfileStats from '@/app/components/Candidate/ProfileStats'
import MainWrapper from '@/app/components/MainWrapper'
import PageHeader from '@/app/components/PageHeader'
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
            </PageHeader>
        </MainWrapper>
    )
}

export default MyCandidateProfile