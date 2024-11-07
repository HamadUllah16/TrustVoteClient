'use client'
import React, { useEffect } from 'react'
import RenderTableHead from '../RenderTableHead'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/app/redux/store'
import { getAdminProfile } from '@/app/redux/features/adminSlice'
import { getApprovedCandidates } from '@/app/redux/features/candidateSlice'
import { Stack, Typography } from '@mui/material'
import RenderCandidates from './RenderCandidates'

function NominatedCandidatesTable() {
    const { approvedCandidates, loading } = useSelector((state: RootState) => state.candidate);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getAdminProfile())
        dispatch(getApprovedCandidates());
    }, [])
    return (
        <>
            {approvedCandidates && approvedCandidates.length > 0 ?
                <RenderTableHead
                    labels={['#', 'Name', 'Party Affiliation', 'Constituency Type', 'Status', 'Gender', 'DOB', 'Actions']}
                >
                    <RenderCandidates approvedCandidates={approvedCandidates} loading={loading} />

                </RenderTableHead>
                :
                <Stack flexGrow={1}>
                    <Typography color={'primary.main'}>
                        No candidates found...
                    </Typography>
                </Stack>
            }
        </>
    )
}

export default NominatedCandidatesTable