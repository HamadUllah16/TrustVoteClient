'use client'
import { IconButton } from '@mui/material'
import React, { useState } from 'react'
import { Add } from '@mui/icons-material';
import AddPoliticalParty from '@/app/components/AdminComponents/AddPoliticalParty';
import RenderPoliticalParties from '@/app/components/AdminComponents/RenderPoliticalParties';
import MainWrapper from '@/app/components/MainWrapper';
import AdminSidebar from '@/app/components/AdminComponents/AdminSidebar';
import RenderTableHead from '@/app/components/RenderTableHead';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';
import PageHeader from '@/app/components/PageHeader';

function AllPoliticalPartiesPage() {
    const [showAddPartyModal, setShowAddPartyModel] = useState(false);
    const { role } = useSelector((state: RootState) => state.user.userProfile)
    return (
        <MainWrapper>

            <AdminSidebar />

            <PageHeader
                title='Political Parties'
                subtitle={null}
                action={null}
            >

                <RenderTableHead
                    labels={role === 'admin' ? ['#', 'Name', 'Abbreviation', 'Symbol', 'Actions'] : ['#', 'Name', 'Abbreviation', 'Symbol']}
                    action={
                        role === 'admin' &&
                        <IconButton onClick={() => setShowAddPartyModel(true)}>
                            <Add color='primary' />
                        </IconButton>
                    }>

                    <RenderPoliticalParties />

                </RenderTableHead>
            </PageHeader>

            {showAddPartyModal && role === 'admin' &&
                <AddPoliticalParty display={showAddPartyModal} setDisplay={setShowAddPartyModel} />
            }

        </MainWrapper>

    )
}

export default AllPoliticalPartiesPage