import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store';
import { getProvincialRelevantCandidates } from '../redux/features/candidateSlice';
import { Stack, Typography } from '@mui/material';
import BallotCard from './BallotCard';

function RenderProvincialBallots() {

    const dispatch = useDispatch<AppDispatch>();
    const { myProvincialCandidates } = useSelector((state: RootState) => state.candidate);

    useEffect(() => {
        dispatch(getProvincialRelevantCandidates())
    }, [])
    return (
        <Stack direction={'row'} gap={1} flexWrap={'wrap'}>
            {myProvincialCandidates.length > 0 ? myProvincialCandidates.map((candidate: any) => {
                return (
                    <React.Fragment key={candidate._id}>
                        <BallotCard candidate={candidate} />
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

export default RenderProvincialBallots