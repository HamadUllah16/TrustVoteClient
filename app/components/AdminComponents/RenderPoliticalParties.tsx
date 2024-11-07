'use client'
import { allPoliticalParties, deletePoliticalParty, getAdminProfile } from '@/app/redux/features/adminSlice';
import { AppDispatch, RootState } from '@/app/redux/store';
import { Button, CircularProgress, IconButton, Stack, TableBody, TableCell, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image';
import { Delete } from '@mui/icons-material';
import Modal from '../Modal';
import toast from 'react-hot-toast';

function RenderPoliticalParties() {
    const { allParties, loading } = useSelector((state: RootState) => state.admin);
    const { userProfile } = useSelector((state: RootState) => state.user)
    const [deleteInfo, setDeleteInfo] = useState('');

    const dispatch = useDispatch<AppDispatch>();

    function deleteHandler() {
        toast.promise(
            dispatch(deletePoliticalParty({ _id: deleteInfo }))
                .unwrap(), {
            loading: 'Loading...',
            success: 'Political Party Deleted Successfully.',
            error: 'Could not delete the Political Party.'
        }
        )
        setDeleteInfo('');
    }
    useEffect(() => {
        dispatch(getAdminProfile())
        dispatch(allPoliticalParties());
    }, [])
    return (
        <>
            {allParties && allParties.map((party: any, index: number) => {
                return (
                    <TableRow key={index + 1}>
                        <TableCell sx={{ color: 'secondary.100' }}>{index + 1}</TableCell>
                        <TableCell sx={{ color: 'secondary.100' }}>{party.name}</TableCell>
                        <TableCell sx={{ color: 'secondary.100' }}>{party.abbreviation}</TableCell>
                        <TableCell><Image src={party.symbol} width={50} height={50} alt='party symbol' /> </TableCell>
                        {userProfile.role === 'admin' &&
                            <TableCell>
                                <Stack direction={'row'}>
                                    <IconButton onClick={() => setDeleteInfo(party._id)}>
                                        <Delete sx={{ color: 'primary.main' }} />
                                    </IconButton>
                                </Stack>
                            </TableCell>
                        }
                    </TableRow>
                )
            })}
            {deleteInfo &&
                <Modal>
                    <Stack p={5} gap={3} bgcolor={'secondary.main'} borderRadius={2} border={'1px solid'} borderColor={'secondary.200'}>

                        <Stack gap={1} alignItems={'center'}>
                            <Typography color={'error'} variant='h5'>You are about to delete a Political Party.</Typography>
                            <Typography color={'primary.200'} variant='subtitle1'>This action is not reversible.</Typography>
                        </Stack>

                        <Stack direction={'row'} gap={1}>
                            <Button fullWidth variant='contained' onClick={deleteHandler}>
                                {loading ?
                                    <CircularProgress size={'12px'} />
                                    :
                                    'Delete'
                                }
                            </Button>

                            <Button fullWidth variant='outlined' onClick={() => setDeleteInfo('')}>
                                Cancel
                            </Button>
                        </Stack>

                    </Stack>
                </Modal>
            }
        </>
    )
}

export default RenderPoliticalParties;