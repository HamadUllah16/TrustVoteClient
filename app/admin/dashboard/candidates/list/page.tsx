import { Box, Divider, Stack, Table, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import RenderCandidates from '@/app/components/Candidate/RenderCandidates';
import React from 'react'
import AdminSidebar from '@/app/components/AdminComponents/AdminSidebar';
import MainWrapper from '@/app/components/MainWrapper';
import RenderTableHead from '@/app/components/RenderTableHead';

function AllCandidatesPage() {
    return (
        <MainWrapper>

            <AdminSidebar />

            <RenderTableHead
                title='Nominated Candidates'
                subtitle={null}
                labels={['#', 'Name', 'Party Affiliation', 'Constituency', 'Gender', 'Status', 'DOB', 'Actions']}
                action={null}
            >
                <RenderCandidates />

            </RenderTableHead>

        </MainWrapper>
    )
}

export default AllCandidatesPage