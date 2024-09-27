'use client'
import { getAdminProfile } from '@/app/redux/features/adminSlice';
import { AppDispatch, RootState } from '@/app/redux/store';
import { Stack, TableBody, TableCell, TableRow } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getApprovedCandidates } from '@/app/redux/features/candidateSlice';

function RenderCandidates() {
    const { approvedCandidates } = useSelector((state: RootState) => state.candidate);

    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(getAdminProfile())
        dispatch(getApprovedCandidates());
    }, [])
    return (
        <TableBody>
            {approvedCandidates && approvedCandidates.map((candidate: any, index: number) => {
                return (
                    <TableRow key={index + 1}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{candidate.firstName}</TableCell>
                        <TableCell>{candidate.partyAffiliation}</TableCell>
                        <TableCell>{candidate.constituencyType}</TableCell>
                        <TableCell>{candidate.gender}</TableCell>
                        <TableCell>
                            <Stack
                                bgcolor={candidate.status === 'approved' ? '#008cff' : 'red'}
                                px={1}
                                py={0.2}
                                alignItems={'center'}
                                borderRadius={10}
                            >
                                {candidate.status}
                            </Stack>
                        </TableCell>
                        <TableCell>{candidate.dateOfBirth}</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                )
            })}
        </TableBody>
    )
}

export default RenderCandidates