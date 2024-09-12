'use client'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { getAllCandidates } from '../redux/features/candidateSlice'
import { Skeleton, Stack, TableCell, TableRow } from '@mui/material'
import Image from 'next/image'

function RenderCandidates() {
    const { allCandidates, loading } = useSelector((state: RootState) => state.candidate)
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(getAllCandidates());
    }, [])
    return (
        <>
            {allCandidates &&
                allCandidates.map((candidate: any) => {
                    return (
                        <TableRow>
                            <TableCell>{loading ? <Skeleton /> : candidate._id}</TableCell>
                            <TableCell>{loading ? <Skeleton /> : `${candidate.firstName}  ${candidate.lastName}`}</TableCell>
                            <TableCell sx={{ textTransform: 'capitalize' }}>{loading ? <Skeleton /> : candidate.constituencyType}</TableCell>
                            <TableCell>{loading ? <Skeleton /> : candidate.constituency}</TableCell>
                            <TableCell>{loading ? <Skeleton /> : candidate.partyAffiliation}</TableCell>
                            <TableCell>{loading ? <Skeleton /> : <Image src={candidate.manifesto} width={50} height={50} alt='candidate maniesto' />}</TableCell>
                        </TableRow>

                    )
                })
            }
        </>
    )
}

export default RenderCandidates