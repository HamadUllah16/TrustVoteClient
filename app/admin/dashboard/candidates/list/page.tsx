import { Box, Divider, Stack, Table, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import RenderCandidates from '@/app/components/Candidate/RenderCandidates';
import React from 'react'
import AdminSidebar from '@/app/components/AdminComponents/AdminSidebar';
import MainWrapper from '@/app/components/MainWrapper';
import RenderTableHead from '@/app/components/RenderTableHead';
import PageHeader from '@/app/components/PageHeader';
import NominatedCandidatesTable from '@/app/components/Candidate/NominatedCandidatesTable';

function AllCandidatesPage() {
    return (
        <MainWrapper>

            <AdminSidebar />

            <PageHeader
                title='Nominated Candidates'
                subtitle={null}
                action={null}
            >
                <NominatedCandidatesTable />

            </PageHeader>
        </MainWrapper>
    )
}

export default AllCandidatesPage