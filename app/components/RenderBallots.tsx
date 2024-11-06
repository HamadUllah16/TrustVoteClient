import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { Stack, Typography } from '@mui/material';
import { getRelevantCandidates } from '../redux/features/candidateSlice';
import toast from 'react-hot-toast';
import BallotCard from './BallotCard';
import { getElectionSession } from '../redux/features/electionSessionSlice';

function RenderBallots() {
    const { userProfile } = useSelector((state: RootState) => state.user);
    const { myCandidates } = useSelector((state: RootState) => state.candidate);
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
            {myCandidates.length > 0 ? myCandidates.map((candidate: any) => {
                return (
                    <React.Fragment key={candidate._id}>
                        <BallotCard candidate={candidate} assembly={'national'} />
                    </React.Fragment>
                )
            })
                :
                <Typography color={'primary.200'}>
                    No candidates...
                </Typography>
            }
        </Stack>
    )
}

export default RenderBallots