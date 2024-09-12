'use client'
import { getPendingCandidate } from '@/app/redux/features/adminSlice';
import { AppDispatch, RootState } from '@/app/redux/store';
import { TableBody, TableCell, TableRow } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../Loading';

function RenderCandidates() {
    const { pendingCandidates, loading } = useSelector((state: RootState) => state.admin)

    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(getPendingCandidate());
    }, [])
    return (
        <TableBody>
            <TableRow>
                <TableCell>
                    {loading && <Loading />}
                </TableCell>
            </TableRow>
        </TableBody>
    )
}

export default RenderCandidates