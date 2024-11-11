'use client'
import { Stack, Typography } from '@mui/material'
import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { getAllElectionSessions } from '../redux/features/electionSessionSlice';

function PreviousElectionSessions() {
    const { allElectionSessions } = useSelector((state: RootState) => state.electionSession);
    const dispatch = useDispatch<AppDispatch>();
    const recentElections = useMemo(() => {
        return allElectionSessions.filter((election) => election.status !== 'active');
    }, [])

    useEffect(() => {
        dispatch(getAllElectionSessions());
    }, [])
    return (
        <Stack
            gap={1}
            p={2}
            border={'1px solid'}
            borderColor={'secondary.200'}
            borderRadius={1}
        >
            {recentElections.length > 0 && recentElections.map((election) => {
                return (
                    <Stack
                        key={election._id}
                        direction={'row'}
                    >
                        <Stack
                            gap={1}
                        >
                            <Typography>
                                Name
                            </Typography>
                            <Typography>
                                {election.name}
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
                                <Typography
                                    variant='h5'
                                    textTransform={'capitalize'}
                                    color={'secondary.100'}
                                >
                                    {election.status}
                                </Typography>
                            </Stack>
                        </Stack>

                    </Stack>
                )
            })}
        </Stack>
    )
}

export default PreviousElectionSessions