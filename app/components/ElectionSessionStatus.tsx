import { Button, CircularProgress, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import SchedulingElectionSession from './SchedulingElectionSession'
import { Circle, Warning } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { getElectionSession, tryElectionSessionTransaction } from '../redux/features/electionSessionSlice';
import Countdown from './Countdown';
import IconMenu from './IconMenuElectionSession';
import toast from 'react-hot-toast';

export default function ElectionSessionStatus() {
    const { electionSession, loading } = useSelector((state: RootState) => state.electionSession);
    const { role } = useSelector((state: RootState) => state.user.userProfile);
    const GRACE_PERIOD_MS = 30000; //waiting time for transaction to perform.
    const dispatch = useDispatch<AppDispatch>();

    function retryTransaction() {
        toast.promise(
            dispatch(tryElectionSessionTransaction({ electionSessionId: electionSession._id }))
                .unwrap(), {
            loading: 'Loading...',
            success: 'Election Session Synchronized.',
            error: 'Could not fix the issue.'
        }
        )
    }

    useEffect(() => {
        dispatch(getElectionSession())
    }, [])
    return (
        <Stack >

            {loading &&
                <CircularProgress size={'12px'} />
            }
            {
                electionSession && (electionSession.status === '' || electionSession.status === 'ended') && role === 'admin' &&
                <Stack gap={1}>
                    <Typography variant='h6' color={'primary.main'}>
                        Schedule an Election Session
                    </Typography>
                    <SchedulingElectionSession />
                </Stack>
            }

            {
                electionSession._id ?
                    <Stack gap={1} >
                        <Typography variant='h6' color={'primary.main'}>
                            {electionSession.status === 'ended' ?
                                "Recent Election Session"
                                :
                                electionSession.status === 'scheduled' ?
                                    'Scheduled Election Session'
                                    :
                                    "Current Election Session"
                            }
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

                            {
                                electionSession.status === 'scheduled' && role === 'admin' && electionSession.scheduledTime !== null &&
                                    new Date(electionSession.scheduledTime).getTime() + GRACE_PERIOD_MS < Date.now() ?
                                    <Stack
                                        bgcolor={'secondary.200'}
                                        p={2}
                                        borderRadius={1}
                                        alignItems={'center'}
                                    >
                                        <Stack direction={'row'} gap={1}>
                                            <Warning fontSize='medium' color='error' />
                                            <Typography variant='subtitle2' color={'error'}>
                                                Error occurred while scheduling this Session, please try again.
                                            </Typography>
                                        </Stack>

                                        <Button onClick={retryTransaction}>
                                            Retry
                                        </Button>
                                    </Stack>
                                    :
                                    electionSession.status === 'scheduled' &&
                                    <Countdown scheduledTime={electionSession.scheduledTime} />
                            }

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
                                        color={electionSession.status === 'active' ?
                                            'success'
                                            :
                                            electionSession.status === 'ended' ?
                                                'error'
                                                :
                                                'warning'
                                        }
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
                                        options={electionSession.status === 'paused' ? ['Resume', 'End'] : ['Pause', 'End']}
                                    />
                                </Stack>
                            }

                        </Stack>
                    </Stack>
                    :
                    <>
                        {!loading &&

                            <Stack flexGrow={1}>
                                <Typography color={'primary.main'}>
                                    No recent election sessions found. Wait for the Election Commissioner to schedule an Election Session.
                                </Typography>
                            </Stack>
                        }
                    </>
            }
        </Stack >

    )
}
