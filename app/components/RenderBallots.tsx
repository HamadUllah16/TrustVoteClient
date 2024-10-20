import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { Stack, Typography } from '@mui/material';
import { getRelevantCandidates } from '../redux/features/candidateSlice';
import toast from 'react-hot-toast';
import BallotCard from './BallotCard';

function RenderBallots() {
    const { userProfile } = useSelector((state: RootState) => state.user);
    const { myCandidates } = useSelector((state: RootState) => state.candidate);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getRelevantCandidates())
    }, [])
    return (
        <Stack direction={'row'} gap={1} flexWrap={'wrap'}>
            {myCandidates.map((candidate: any) => {
                return (
                    <BallotCard candidate={candidate} />
                )
            })}
        </Stack>
    )
}

export default RenderBallots