import { Box, Divider, Stack, Table, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import RenderCandidates from '@/app/components/Candidate/RenderCandidates';
import React from 'react'
import AdminSidebar from '@/app/components/AdminComponents/AdminSidebar';
import MainWrapper from '@/app/components/MainWrapper';
import RenderTableHead from '@/app/components/RenderTableHead';
import PageHeader from '@/app/components/PageHeader';

function AllCandidatesPage() {
    return (
        <MainWrapper>

            <AdminSidebar />

            <PageHeader
                title='Nominated Candidates'
                subtitle={null}
                action={null}
            >

                <RenderTableHead
                    labels={['#', 'Name', 'Party Affiliation', 'Constituency', 'Gender', 'Status', 'DOB', 'Actions']}
                    action={null}
                >
                    <RenderCandidates />

                </RenderTableHead>

            </PageHeader>
        </MainWrapper>
    )
}

export default AllCandidatesPage