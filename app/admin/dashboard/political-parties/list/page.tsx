'use client'
import Sidebar from '@/app/components/Sidebar'
import { Divider, IconButton, Stack, Table, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Add } from '@mui/icons-material';
import AddPoliticalParty from '@/app/components/AdminComponents/AddPoliticalParty';
import RenderPoliticalParties from '@/app/components/AdminComponents/RenderPoliticalParties';
import MainWrapper from '@/app/components/MainWrapper';
import AdminSidebar from '@/app/components/AdminComponents/AdminSidebar';
import RenderTableData from '@/app/components/RenderTableData';
import RenderTableHead from '@/app/components/RenderTableHead';

function AllPoliticalPartiesPage() {
    const [showAddPartyModal, setShowAddPartyModel] = useState(false);
    return (
        <MainWrapper>

            <AdminSidebar />

            <RenderTableHead
                title='Political Parties'
                subtitle={null}
                labels={['#', 'Name', 'Abbreviation', 'Symbol', 'Actions']}
                action={
                    <IconButton onClick={() => setShowAddPartyModel(true)}>
                        <Add />
                    </IconButton>
                }>

                <RenderPoliticalParties />

            </RenderTableHead>

            {showAddPartyModal &&
                <AddPoliticalParty display={showAddPartyModal} setDisplay={setShowAddPartyModel} />
            }

        </MainWrapper>

    )
}

export default AllPoliticalPartiesPage