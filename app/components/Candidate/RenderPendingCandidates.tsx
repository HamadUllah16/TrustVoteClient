'use client'
import { approveOrRejectCandidate, getAdminProfile } from '@/app/redux/features/adminSlice';
import { getPendingCandidates } from '@/app/redux/features/candidateSlice';
import { AppDispatch, RootState } from '@/app/redux/store';
import { Cancel, Check, OpenInNew } from '@mui/icons-material';
import { TableBody, TableCell, Stack, TableRow, IconButton, Typography, Button, Divider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../Modal';
import Image from 'next/image';

function RenderPendingCandidates() {
    const { pendingCandidates } = useSelector((state: RootState) => state.candidate);
    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState({
        _id: '',
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
                {pendingCandidates && pendingCandidates.map((candidate: any, index: number) => {
                    return (
                        <TableRow key={candidate._id}>
                            <TableCell>{index}</TableCell>
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
                                </Stack>
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
            {show && selected &&
                <Modal>
                    <Stack gap={2} bgcolor={'white'} p={2} borderRadius={2} boxShadow={5}>
                        <Stack direction={'row'} justifyContent={'space-between'}>
                            <Typography variant='h6'>Review</Typography>
                            <IconButton sx={{ p: 0 }} onClick={() => setShow(false)}>
                                <Cancel />
                            </IconButton>
                        </Stack>

                        <Divider />

                        <Stack direction={'row'} gap={2}>
                            <Stack border={'1px solid #DADADA'} p={2} borderRadius={2}>
                                <Typography variant='subtitle1' fontWeight={'bold'}>{`${selected.firstName}  ${selected.lastName}`}</Typography>
                                <Typography>{selected.partyAffiliation}</Typography>
                            </Stack>
                            <Image
                                src={selected.manifesto}
                                width={200}
                                height={200}
                                alt='manifesto picture'
                            />
                        </Stack>

                        <Stack justifyContent={'end'} gap={2} direction={'row'}>
                            <Button variant='contained' onClick={() => dispatch(approveOrRejectCandidate({ id: selected._id, status: 'approved', setShow }))}>
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