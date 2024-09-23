'use client'
import { getAdminProfile } from '@/app/redux/features/adminSlice';
import { getPendingCandidates } from '@/app/redux/features/candidateSlice';
import { AppDispatch, RootState } from '@/app/redux/store';
import { Cancel, Check, OpenInNew } from '@mui/icons-material';
import { TableBody, TableCell, Stack, TableRow, IconButton, Typography, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../Modal';
import Image from 'next/image';

function RenderPendingCandidates() {
    const { pendingCandidates } = useSelector((state: RootState) => state.candidate);
    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState({
        firstName: '',
        lastName: '',
        partyAffiliation: '',
        manifesto: ''
    });

    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(getAdminProfile())
        dispatch(getPendingCandidates());
    }, [])
    return (
        <>
            <TableBody>
                {pendingCandidates && pendingCandidates.map((candidate: any) => {
                    return (
                        <TableRow>
                            <TableCell>{candidate._id}</TableCell>
                            <TableCell>{candidate.firstName}</TableCell>
                            <TableCell>{candidate.partyAffiliation}</TableCell>
                            <TableCell>{candidate.constituencyType}</TableCell>
                            <TableCell>
                                <Stack
                                    bgcolor={candidate.status === 'pending' ? 'orange' : 'red'}
                                    px={1}
                                    py={0.2}
                                    alignItems={'center'}
                                    borderRadius={10}
                                >
                                    {candidate.status}
                                </Stack>
                            </TableCell>
                            <TableCell>{candidate.gender}</TableCell>
                            <TableCell>{candidate.dateOfBirth}</TableCell>
                            <TableCell>
                                <Stack direction={'row'}>
                                    <IconButton onClick={
                                        () => {
                                            setSelected(candidate);
                                            setShow(true);
                                        }
                                    }>
                                        <OpenInNew />
                                    </IconButton>
                                    <IconButton color='error'>
                                        <Cancel />
                                    </IconButton>
                                    <IconButton color='success'>
                                        <Check />
                                    </IconButton>
                                </Stack>
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
            {show && selected &&
                <Modal>
                    <Stack bgcolor={'white'} p={2} borderRadius={2} boxShadow={5}>
                        <Stack alignItems={'end'}>
                            <IconButton onClick={() => setShow(false)}>
                                <Cancel />
                            </IconButton>
                        </Stack>

                        <Stack direction={'row'} gap={2}>
                            <Typography>{selected.firstName + selected.lastName}</Typography>
                            <Typography>{selected.partyAffiliation}</Typography>
                            <Image
                                src={selected.manifesto}
                                width={200}
                                height={200}
                                alt='manifesto picture'
                            />
                        </Stack>

                        <Stack justifyContent={'end'} gap={2} direction={'row'}>
                            <Button variant='outlined' color='error'>
                                Reject
                            </Button>
                            <Button variant='contained'>
                                Approve
                            </Button>
                        </Stack>
                    </Stack>
                </Modal>
            }
        </>
    )
}

export default RenderPendingCandidates