'use client'
import { approveOrRejectCandidate, getAdminProfile } from '@/app/redux/features/adminSlice';
import { getPendingCandidates } from '@/app/redux/features/candidateSlice';
import { AppDispatch, RootState } from '@/app/redux/store';
import { Cancel, Download, Fullscreen, OpenInNew } from '@mui/icons-material';
import { TableCell, Stack, TableRow, IconButton, Typography, Button, Divider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../Modal';
import { pdfjs } from 'react-pdf';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const PDF = dynamic(() => import('../PDF'), { ssr: false });


function RenderPendingCandidates({ pendingCandidates, loading }: { loading: boolean, pendingCandidates: any }) {
    const [activeAttachment, setActiveAttachment] = useState('manifesto');
    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState({
        _id: '',
        firstName: '',
        lastName: '',
        partyAffiliation: '',
        manifesto: '',
        constituency: '',
        cnicFront: '',
        cnicBack: '',
        status: '',
    });

    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
    }, [])
    return (
        <>
            {pendingCandidates.length > 0 ? pendingCandidates.map((candidate: any, index: number) => {
                return (
                    <TableRow key={candidate._id}>
                        <TableCell sx={{ color: 'secondary.100', textTransform: 'capitalize' }}>{index + 1}</TableCell>
                        <TableCell sx={{ color: 'secondary.100', textTransform: 'capitalize' }}>{candidate.firstName}</TableCell>
                        <TableCell sx={{ color: 'secondary.100', textTransform: 'capitalize' }}>{candidate.partyAffiliation}</TableCell>
                        <TableCell sx={{ color: 'secondary.100', textTransform: 'capitalize' }}>{candidate.constituencyType}</TableCell>
                        <TableCell sx={{ color: 'secondary.100', textTransform: 'capitalize' }}>{candidate.constituency}</TableCell>
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
                        <TableCell sx={{ color: 'secondary.100', textTransform: 'capitalize' }}>{candidate.gender}</TableCell>
                        <TableCell sx={{ color: 'secondary.100', textTransform: 'capitalize' }}>{candidate.dateOfBirth}</TableCell>
                        <TableCell>
                            <Stack direction={'row'}>
                                <Button
                                    endIcon={<OpenInNew sx={{ color: 'secondary.100' }} />}
                                    onClick={
                                        () => {
                                            setSelected(candidate);
                                            setShow(true);
                                        }
                                    }
                                >
                                    Review
                                </Button>
                            </Stack>
                        </TableCell>
                    </TableRow>
                )
            })
                :
                <Typography>
                    No Candidates...
                </Typography>
            }
            {show && selected &&
                <Modal>

                    <Stack
                        maxHeight={'90vh'}
                        minWidth={'800px'}
                        divider={<Divider sx={{ borderColor: 'secondary.200' }} />}
                        gap={2}
                        p={2}
                        boxShadow={5}
                        bgcolor={'background.default'}
                        borderRadius={2}
                        sx={{ transition: 'all 0.3s ease' }}
                    >
                        <Stack direction={'row'} justifyContent={'space-between'} color={'primary.main'}>
                            <Typography variant='h5'>Review</Typography>
                            <IconButton sx={{ p: 0 }} onClick={() => setShow(false)}>
                                <Cancel color='primary' />
                            </IconButton>
                        </Stack>

                        <Stack
                            direction={'row'}
                            gap={2}
                            borderRadius={2}
                            p={2}
                            border={'1px solid'}
                            borderColor={'secondary.200'}
                            bgcolor={'background.default'}

                        >
                            <Stack gap={2} pr={2} borderRight={'1px solid'} borderColor={'secondary.200'} color={'seconday.100'}>

                                <Stack gap={1}>

                                    <Typography color={'secondary.100'} variant='h6' fontWeight={'bold'}>
                                        {`${selected.firstName}  ${selected.lastName}`}
                                    </Typography>

                                    <Typography color={'primary.200'}>
                                        {selected.partyAffiliation}
                                    </Typography>


                                    <Typography color={'primary.200'}>
                                        {selected.constituency}
                                    </Typography>

                                    <Stack bgcolor={selected.status === 'pending' ? '#FFA500' : 'primary.main'} width={'100%'} alignItems={'center'} borderRadius={1}>
                                        <Typography variant='body2' textTransform={'capitalize'} p={1} color={'secondary.100'}>
                                            {selected.status}
                                        </Typography>
                                    </Stack>

                                </Stack>

                                <Divider sx={{ borderColor: 'secondary.200' }} />

                                <Stack gap={2}>
                                    <Typography variant='h6' color={'secondary.100'}>
                                        Attachments
                                    </Typography>
                                    <Stack gap={1}>
                                        <Button
                                            onClick={() => setActiveAttachment('cnicFront')}
                                            variant={activeAttachment === 'cnicFront' ? 'contained' : 'outlined'}
                                        >
                                            CNIC Front
                                        </Button>

                                        <Button
                                            onClick={() => setActiveAttachment('cnicBack')}
                                            variant={activeAttachment === 'cnicBack' ? 'contained' : 'outlined'}
                                        >
                                            CNIC Back
                                        </Button>

                                        <Button
                                            onClick={() => setActiveAttachment('manifesto')}
                                            variant={activeAttachment === 'manifesto' ? 'contained' : 'outlined'}
                                        >
                                            Manifesto
                                        </Button>
                                    </Stack>
                                </Stack>

                            </Stack>

                            <Stack gap={2} maxHeight={'60vh'}>

                                <Stack direction={'row'} justifyContent={'end'} gap={1}>

                                    <Button
                                        endIcon={<Download />}
                                    >
                                        <a href={selected.manifesto} download={'manifesto.pdf'} target='_blank'>
                                            Download
                                        </a>
                                    </Button>

                                </Stack>

                                {activeAttachment === 'cnicFront' &&
                                    <Image
                                        src={selected.cnicFront}
                                        height={200}
                                        width={300}
                                        alt='a picture of cnic front'
                                    />
                                }

                                {activeAttachment === 'manifesto' &&
                                    <PDF fileUrl={selected.manifesto} />
                                }

                                {activeAttachment === 'cnicBack' &&
                                    <Image
                                        src={selected.cnicBack}
                                        height={200}
                                        width={300}
                                        alt='a picture of cnic front'
                                    />
                                }

                            </Stack>

                        </Stack>

                        <Stack justifyContent={'end'} gap={2} direction={'row'}>
                            <Button variant='contained' onClick={() => dispatch(approveOrRejectCandidate({ id: selected._id, status: 'approved', setShow }))}>
                                Approve
                            </Button>
                        </Stack>
                    </Stack>
                </Modal >
            }

        </>
    )
}

export default RenderPendingCandidates