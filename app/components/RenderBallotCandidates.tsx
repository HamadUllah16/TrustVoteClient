'use client'
import React from 'react'
import { Skeleton, Stack, TableCell, TablePagination, TableRow, Typography } from '@mui/material'
import Image from 'next/image'
import Modal from './Modal'

function RenderBallotCandidates({ candidates, loading, action }: { action: React.ReactNode | null, candidates: any[], loading: boolean }) {
    return (
        <>
            {candidates.length &&
                candidates.map((candidate: { _id: string, firstName: string, lastName: string, constituency: string, partyAffiliation: string }, index: number) => {
                    return (
                        <TableRow key={candidate._id}>
                            <TableCell sx={{ color: 'secondary.100' }}>{loading ? <Skeleton sx={{ bgcolor: 'secondary.100' }} /> : index + 1}</TableCell>
                            <TableCell sx={{ color: 'secondary.100' }}>{loading ? <Skeleton sx={{ bgcolor: 'secondary.100' }} /> : candidate.firstName + " " + candidate.lastName}</TableCell>
                            <TableCell sx={{ color: 'secondary.100' }}>{loading ? <Skeleton sx={{ bgcolor: 'secondary.100' }} /> : candidate.constituency}</TableCell>
                            <TableCell sx={{ color: 'secondary.100' }}>{loading ? <Skeleton sx={{ bgcolor: 'secondary.100' }} /> : candidate.partyAffiliation}</TableCell>
                            <TableCell sx={{ color: 'secondary.100' }}>{loading ? <Skeleton sx={{ bgcolor: 'secondary.100' }} /> : action}</TableCell>
                        </TableRow>
                    )
                })
            }
        </>
    )
}

export default RenderBallotCandidates