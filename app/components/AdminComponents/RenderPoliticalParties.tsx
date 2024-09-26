'use client'
import { getAdminProfile } from '@/app/redux/features/adminSlice';
import { AppDispatch, RootState } from '@/app/redux/store';
import { IconButton, Stack, TableBody, TableCell, TableRow } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getApprovedCandidates } from '@/app/redux/features/candidateSlice';
import Image from 'next/image';
import { Delete, Edit } from '@mui/icons-material';
import { allPoliticalParties } from '@/app/redux/features/profileCompletionSlice';

function RenderPoliticalParties() {
    const { allParties } = useSelector((state: RootState) => state.profileCompletion);
    const { userProfile } = useSelector((state: RootState) => state.user)

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
                        {userProfile.role === 'admin' &&
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
                        }
                    </TableRow>
                )
            })}
        </TableBody>
    )
}

export default RenderPoliticalParties;