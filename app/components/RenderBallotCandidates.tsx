'use client'
import React from 'react'
import { Skeleton, Stack, TableCell, TablePagination, TableRow, Typography } from '@mui/material'

import VoteButtonInBallots from './UserComponents/VoteButtonInBallots'

function RenderBallotCandidates({ candidates, loading }: { candidates: any[], loading: boolean }) {
    return (
        <>
            {candidates.length &&
                candidates.map((candidate: { candidateId: string, _id: string, firstName: string, lastName: string, constituency: string, partyAffiliation: string, constituencyType: string }, index: number) => {
                    return (
                        <TableRow key={candidate._id}>
                            <TableCell sx={{ color: 'secondary.100' }}>{loading ? <Skeleton sx={{ bgcolor: 'secondary.100' }} /> : candidate?.candidateId}</TableCell>
                            <TableCell sx={{ color: 'secondary.100' }}>{loading ? <Skeleton sx={{ bgcolor: 'secondary.100' }} /> : candidate.firstName + " " + candidate.lastName}</TableCell>
                            <TableCell sx={{ color: 'secondary.100' }}>{loading ? <Skeleton sx={{ bgcolor: 'secondary.100' }} /> : candidate.constituency}</TableCell>
                            <TableCell sx={{ color: 'secondary.100' }}>{loading ? <Skeleton sx={{ bgcolor: 'secondary.100' }} /> : candidate.partyAffiliation}</TableCell>
                            <TableCell sx={{ color: 'secondary.100' }}>{loading ? <Skeleton sx={{ bgcolor: 'secondary.100' }} /> : <VoteButtonInBallots candidate={candidate} />}</TableCell>
                        </TableRow>


                    )
                })
            }
        </>
    )
}

export default RenderBallotCandidates