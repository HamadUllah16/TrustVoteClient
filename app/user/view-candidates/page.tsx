'use client'
import React, { useEffect } from 'react'
import withAuth from '@/app/utils/withAuth';
import UserSidebar from '@/app/components/UserComponents/UserSidebar';
import MainWrapper from '@/app/components/MainWrapper';
import RenderTableHead from '@/app/components/RenderTableHead';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/redux/store';
import { getApprovedCandidates } from '@/app/redux/features/candidateSlice';
import RenderTableData from '@/app/components/RenderTableData';
import PageHeader from '@/app/components/PageHeader';

function ViewCandidatesPage() {
    const { approvedCandidates, loading } = useSelector((state: RootState) => state.candidate)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(getApprovedCandidates());
    }, [])
    return (
        <MainWrapper>

            <UserSidebar />

            <PageHeader
                title='All Candidates'
                subtitle={'Nominated candidates are listed below'}
                action={null}
            >
                <RenderTableHead
                    labels={['#', 'Name', 'Constituency Type', 'Constituency', 'Party Affiliation']}
                >

                    {/* table body */}
                    <RenderTableData
                        tableData={approvedCandidates}
                        loading={loading}
                        action={null}
                    />
                </RenderTableHead>
            </PageHeader>

        </MainWrapper>
    )
}

export default withAuth(ViewCandidatesPage)