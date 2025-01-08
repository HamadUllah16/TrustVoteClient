'use client'
import { getAdminProfile } from '@/app/redux/features/adminSlice';
import { AppDispatch, RootState } from '@/app/redux/store';
import { Stack, TableBody, TableCell, TableRow } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getApprovedCandidates } from '@/app/redux/features/candidateSlice';

function RenderCandidates({ approvedCandidates, loading, actions }: { approvedCandidates: any, loading: boolean, actions: null | React.ReactNode }) {
    return (
        <>
            {approvedCandidates.map((candidate: any, index: number) => {
                return (
                    <TableRow key={index + 1}>
                        <TableCell sx={{ color: 'secondary.100', textTransform: 'capitalize' }}>{index + 1}</TableCell>
                        <TableCell sx={{ color: 'secondary.100', textTransform: 'capitalize' }}>{candidate.firstName + " " + candidate.lastName}</TableCell>
                        <TableCell sx={{ color: 'secondary.100', textTransform: 'capitalize' }}>{candidate.partyAffiliation}</TableCell>
                        <TableCell sx={{ color: 'secondary.100', textTransform: 'capitalize' }}>{candidate.constituency}</TableCell>
                        <TableCell sx={{ color: 'secondary.100', textTransform: 'capitalize' }}>{candidate.gender}</TableCell>
                        <TableCell sx={{ color: 'secondary.100', textTransform: 'capitalize' }}>
                            <Stack
                                bgcolor={candidate.status === 'verified' ? 'primary.main' : 'red'}
                                px={1}
                                py={1}
                                alignItems={'center'}
                                borderRadius={1}
                            >
                                {candidate.status}
                            </Stack>
                        </TableCell>
                        <TableCell sx={{ color: 'secondary.100', textTransform: 'capitalize' }}>{candidate.dateOfBirth}</TableCell>
                        <TableCell>{actions}</TableCell>
                    </TableRow>
                )
            })}
        </>
    )
}

export default RenderCandidates