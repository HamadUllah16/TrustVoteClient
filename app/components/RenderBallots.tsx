import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { Stack, TableHead, Typography } from '@mui/material';
import { getRelevantCandidates } from '../redux/features/candidateSlice';
import toast from 'react-hot-toast';
import BallotCard from './BallotCard';
import { getElectionSession } from '../redux/features/electionSessionSlice';
import RenderTableHead from './RenderTableHead';
import RenderBallotCandidates from './RenderBallotCandidates';
import VoteButtonInBallots from './UserComponents/VoteButtonInBallots';

function RenderBallots() {
    const { userProfile } = useSelector((state: RootState) => state.user);
    const { myCandidates, loading } = useSelector((state: RootState) => state.candidate);
    const { _id } = useSelector((state: RootState) => state.electionSession.electionSession);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getRelevantCandidates())

        if (!_id) {
            dispatch(getElectionSession());
        }

    }, [])
    return (
        <Stack direction={'row'} gap={1} flexWrap={'wrap'}>
            {myCandidates.length > 0 ?
                <RenderTableHead
                    labels={['#', 'Name', 'Constituency', 'Party Affiliation', 'Actions']}
                >
                    <RenderBallotCandidates
                        candidates={myCandidates}
                        loading={loading}
                        action={
                            <VoteButtonInBallots />
                        }
                    />
                </RenderTableHead>
                :
                <Typography color={'primary.200'}>
                    No candidates...
                </Typography>
            }
        </Stack>
    )
}

export default RenderBallots