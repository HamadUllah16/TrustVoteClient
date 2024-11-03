import { CircularProgress, IconButton, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import SchedulingElectionSession from './SchedulingElectionSession'
import { Circle, Pause } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { getElectionSession } from '../redux/features/electionSessionSlice';
import Countdown from './Countdown';
import IconMenu from './IconMenuElectionSession';
export default function ElectionSessionStatus() {
    const { electionSession, loading } = useSelector((state: RootState) => state.electionSession);
    const { role } = useSelector((state: RootState) => state.user.userProfile);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getElectionSession())
    }, [])
    return (
        <Stack >

            {loading &&
                <CircularProgress size={'12px'} />
            }
            {
                electionSession &&
                (electionSession.status === 'active' || electionSession.status === 'paused') &&
                <Stack gap={1} >
                    <Typography variant='h6' color={'primary.main'}>
                        Current Election Session
                    </Typography>
                    <Stack
                        bgcolor={'primary.main'}
                        direction={'row'}
                        gap={1}
                        p={1}
                        border={'1px solid'}
                        borderColor={'secondary.200'}
                        borderRadius={1}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                    >
                        <Stack p={2}>
                            <Typography variant='subtitle1' color={'secondary.300'}>Name</Typography>
                            <Typography variant='h5' color={'secondary.100'}>
                                {electionSession.name}
                            </Typography>
                        </Stack>

                        <Stack p={2}>
                            <Typography
                                variant='subtitle1'
                                color={'secondary.300'}
                            >
                                Status
                            </Typography>
                            <Stack
                                direction={'row'}
                                gap={1}
                                alignItems={'center'}
                                bgcolor={'secondary.200'}
                                p={1}
                                borderRadius={1}
                            >
                                <Circle
                                    color={electionSession.status === 'paused' ? 'warning' : 'success'}
                                    fontSize='small'
                                />
                                <Typography
                                    variant='h5'
                                    textTransform={'capitalize'}
                                    color={'secondary.100'}
                                >
                                    {electionSession.status}
                                </Typography>
                            </Stack>
                        </Stack>

                        {role === 'admin' && (electionSession.status === 'paused' || electionSession.status === 'active') &&
                            <Stack p={2} >
                                <IconMenu
                                    electionSession={electionSession}
                                    options={electionSession.status === 'paused' ? ['Resume'] : ['Pause']}
                                />
                            </Stack>
                        }

                    </Stack>
                </Stack>
            }
            {electionSession && electionSession.status === 'scheduled' &&
                <Stack gap={1}  >
                    <Typography variant='h6' color={'primary.main'}>
                        Scheduled Election Session
                    </Typography>
                    <Stack bgcolor={'primary.main'} direction={'row'} gap={1} p={1} border={'1px solid'} borderColor={'secondary.200'} borderRadius={1} justifyContent={'space-between'} alignItems={'center'}>
                        <Stack p={2}>
                            <Typography variant='subtitle1' color={'secondary.300'}>Name</Typography>
                            <Typography variant='h5' color={'secondary.100'}>
                                {electionSession.name}
                            </Typography>
                        </Stack>

                        <Countdown scheduledTime={electionSession.scheduledTime} />

                        <Stack p={2} >
                            <Typography variant='subtitle1' color={'secondary.300'}>Status</Typography>
                            <Stack direction={'row'} gap={1} alignItems={'center'}>
                                <Circle color={'disabled'} fontSize='small' />
                                <Typography variant='h5' color={'secondary.100'}>
                                    Scheduled
                                </Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            }
            {electionSession && (electionSession.status === '' || electionSession.status === 'ended') && role === 'admin' &&
                <Stack gap={1} p={3}>
                    <Typography variant='h6' color={'primary.main'}>
                        Schedule an Election Session
                    </Typography>
                    <SchedulingElectionSession />
                </Stack>
            }

        </Stack>

    )
}
