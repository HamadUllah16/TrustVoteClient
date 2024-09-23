'use client'
import { getAdminProfile } from '@/app/redux/features/adminSlice';
import { AppDispatch, RootState } from '@/app/redux/store';
import { TableBody, TableCell, TableRow } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getApprovedCandidates } from '@/app/redux/features/candidateSlice';

function RenderCandidates() {
    // const { pendingCandidates, loading } = useSelector((state: RootState) => state.admin)
    const { approvedCandidates } = useSelector((state: RootState) => state.candidate);

    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(getAdminProfile())
        dispatch(getApprovedCandidates());
    }, [])
    return (
        <TableBody>
            {approvedCandidates && approvedCandidates.map((candidate: any) => {
                return (
                    <TableRow>
                        <TableCell>{candidate._id}</TableCell>
                        <TableCell>{candidate.firstName}</TableCell>
                        <TableCell>{candidate.partyAffiliation}</TableCell>
                        <TableCell>{candidate.constituencyType}</TableCell>
                        <TableCell>{candidate.gender}</TableCell>
                        <TableCell>{candidate.dateOfBirth}</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                )
            })}
        </TableBody>
    )
}

export default RenderCandidates