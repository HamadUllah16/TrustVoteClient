'use client'
import React, { useEffect, useState } from 'react'
import RenderPoliticalParties from '@/app/components/AdminComponents/RenderPoliticalParties';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/redux/store';
import MainWrapper from '@/app/components/MainWrapper';
import RenderTableHead from '@/app/components/RenderTableHead';
import { allPoliticalParties } from '@/app/redux/features/profileCompletionSlice';
import PageHeader from '@/app/components/PageHeader';
import CandidateSidebar from '@/app/components/Candidate/CandidateSidebar';
import withAuth from '@/app/utils/withAuth';

function AllPoliticalPartiesPage() {
    const [showAddPartyModal, setShowAddPartyModel] = useState(false);
    const { allParties, loading } = useSelector((state: RootState) => state.profileCompletion);
    const { userProfile } = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(allPoliticalParties())
    }, [])
    return (
        <MainWrapper>

            <CandidateSidebar />

            <PageHeader
                title='Political Parties'
                subtitle={null}
                action={null}
            >
                <RenderTableHead
                    labels={['#', 'Name', 'Abbreviation', 'Symbol']}
                >
                    <RenderPoliticalParties />

                </RenderTableHead>

            </PageHeader>

        </MainWrapper>
    )
}

export default withAuth(AllPoliticalPartiesPage)