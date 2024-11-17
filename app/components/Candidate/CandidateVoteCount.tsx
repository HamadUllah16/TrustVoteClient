'use client'
import { approvedCandidatesForResults } from '@/app/redux/features/candidateSlice'
import { getElectionSession } from '@/app/redux/features/electionSessionSlice'
import { AppDispatch, RootState } from '@/app/redux/store'
import { Circle } from '@mui/icons-material'
import { Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function CandidateVoteCount() {
    const { _id, constituency } = useSelector((state: RootState) => state.user.userProfile);
    const { electionSession } = useSelector((state: RootState) => state.electionSession);
    const { resultCandidates } = useSelector((state: RootState) => state.candidate);

    const myLiveProfile: any = resultCandidates.find((candidate: any) => candidate._id === _id);
    const myVotes = myLiveProfile?.votes[0]?.voters?.length || 0;

    function sortCandidatesByVotes(candidates: typeof resultCandidates, userAssembly: string | null) {
        const filteredCandidates = userAssembly
            ? candidates.filter((candidate: any) => candidate.constituency === userAssembly)
            : candidates;

        return [...filteredCandidates].sort(
            (a: any, b: any) =>
                (b?.votes[0]?.voters?.length || 0) - (a?.votes[0]?.voters?.length || 0)
        );
    }
    const sortedCandidates = sortCandidatesByVotes(resultCandidates, constituency);
    const calculatePosition = () => {

        const position = sortedCandidates.findIndex((candidate: any) => candidate._id === _id);

        return position !== -1 ? position + 1 : 'N/A';
    };

    const dispatch = useDispatch<AppDispatch>();

    // Fetch election session and approved candidates on mount
    useEffect(() => {
        if (!electionSession._id) {
            dispatch(getElectionSession());
        }
        if (resultCandidates.length === 0 && electionSession._id) {
            dispatch(approvedCandidatesForResults({ electionSessionId: electionSession._id }));
        }
    }, [electionSession._id, resultCandidates.length, dispatch]);

    return (
        <Stack
            p={3}
            direction={'row'}
            gap={2}
            justifyContent={'space-between'}
            alignItems={'end'}
            bgcolor={'primary.main'}
            borderRadius={1}
        >
            {/* Votes Count */}
            <Stack>
                <Typography variant='subtitle1'>Real-time Votes</Typography>
                <Typography variant='h3' textAlign={'center'} color={'secondary.100'}>
                    {myVotes}
                </Typography>
            </Stack>

            {/* Position in Constituency */}
            <Stack>
                <Typography variant='subtitle1'>Position</Typography>
                <Stack direction={'row'} gap={1}>
                    <Typography variant='h3' textAlign={'center'} color={'secondary.100'}>
                        {calculatePosition()}
                    </Typography>
                    <Typography variant='body2' color={'secondary.100'}>
                        out of {sortedCandidates.length}
                    </Typography>
                </Stack>
            </Stack>

            {/* Election Status */}
            <Stack>
                <Typography
                    variant='subtitle1'
                    color={'secondary.300'}
                >
                    Election Status
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
        </Stack>
    );
}

export default CandidateVoteCount;
