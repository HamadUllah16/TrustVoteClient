'use client'
import React, { useEffect } from 'react'
import RenderTableHead from '../RenderTableHead'
import RenderPendingCandidates from './RenderPendingCandidates'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/app/redux/store'
import { getAdminProfile } from '@/app/redux/features/adminSlice'
import { getPendingCandidates } from '@/app/redux/features/candidateSlice'
import { Stack, Typography } from '@mui/material'

function PendingCandidatesTable() {
    const { pendingCandidates, loading } = useSelector((state: RootState) => state.candidate);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getAdminProfile())
        dispatch(getPendingCandidates());
    }, [])
    return (
        <>
            {pendingCandidates && pendingCandidates.length > 0 ?
                <RenderTableHead
                    labels={['#', 'Name', 'Party Affiliation', 'Constituency Type', 'Constituency', 'Status', 'Gender', 'DOB', 'Actions']}
                >
                    <RenderPendingCandidates pendingCandidates={pendingCandidates} loading={loading} />

                </RenderTableHead>
                :
                <Stack flexGrow={1} alignItems={'center'} justifyContent={'center'}>
                    <Typography variant='subtitle1' color={'primary.main'}>
                        No pending candidates found. Great work!
                    </Typography>
                </Stack>
            }
        </>
    )
}

export default PendingCandidatesTable