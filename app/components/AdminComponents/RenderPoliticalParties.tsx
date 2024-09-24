'use client'
import { allPoliticalParties, getAdminProfile } from '@/app/redux/features/adminSlice';
import { AppDispatch, RootState } from '@/app/redux/store';
import { IconButton, Stack, TableBody, TableCell, TableRow } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getApprovedCandidates } from '@/app/redux/features/candidateSlice';
import Image from 'next/image';
import { Delete, Edit } from '@mui/icons-material';

function RenderPoliticalParties() {
    const { allParties } = useSelector((state: RootState) => state.admin);

    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(getAdminProfile())
        dispatch(allPoliticalParties());
    }, [])
    return (
        <TableBody>
            {allParties && allParties.map((party: any, index: number) => {
                return (
                    <TableRow key={index + 1}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{party.name}</TableCell>
                        <TableCell>{party.abbreviation}</TableCell>
                        <TableCell><Image src={party.symbol} width={50} height={50} alt='party symbol' /> </TableCell>
                        <TableCell>
                            <Stack direction={'row'}>
                                <IconButton>
                                    <Edit />
                                </IconButton>
                                <IconButton>
                                    <Delete />
                                </IconButton>
                            </Stack>
                        </TableCell>
                    </TableRow>
                )
            })}
        </TableBody>
    )
}

export default RenderPoliticalParties;