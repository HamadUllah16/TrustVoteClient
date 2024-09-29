'use client'
import { Divider, IconButton, Stack, Table, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Add } from '@mui/icons-material';
import AddPoliticalParty from '@/app/components/AdminComponents/AddPoliticalParty';
import RenderPoliticalParties from '@/app/components/AdminComponents/RenderPoliticalParties';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/redux/store';
import UserSidebar from '@/app/components/UserComponents/UserSidebar';
import MainWrapper from '@/app/components/MainWrapper';
import RenderTableHead from '@/app/components/RenderTableHead';
import RenderTableData from '@/app/components/RenderTableData';
import { allPoliticalParties } from '@/app/redux/features/profileCompletionSlice';

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

            <UserSidebar />

            <RenderTableHead
                title='Political Parties'
                subtitle={null}
                labels={['#', 'Name', 'Abbreviation', 'Symbol']}
                action=
                {userProfile.role === 'admin' &&
                    <IconButton onClick={() => setShowAddPartyModel(true)}>
                        <Add />
                    </IconButton>
                }
            >
                <RenderPoliticalParties />

            </RenderTableHead>

            {showAddPartyModal &&
                <AddPoliticalParty display={showAddPartyModal} setDisplay={setShowAddPartyModel} />
            }
        </MainWrapper>
    )
}

export default AllPoliticalPartiesPage