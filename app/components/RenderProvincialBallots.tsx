import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store';
import { getProvincialRelevantCandidates } from '../redux/features/candidateSlice';
import { Stack, Typography } from '@mui/material';
import BallotCard from './BallotCard';
import RenderBallotCandidates from './RenderBallotCandidates';
import RenderTableHead from './RenderTableHead';
import VoteButtonInBallots from './UserComponents/VoteButtonInBallots';

function RenderProvincialBallots() {

    const dispatch = useDispatch<AppDispatch>();
    const { myProvincialCandidates, loading } = useSelector((state: RootState) => state.candidate);

    useEffect(() => {
        dispatch(getProvincialRelevantCandidates())
    }, [])
    return (
        <Stack direction={'row'} gap={1} flexWrap={'wrap'}>
            {myProvincialCandidates.length > 0 ?
                <RenderTableHead
                    labels={['#', 'Name', 'Constituency', 'Party Affiliation', 'Actions']}
                >
                    <RenderBallotCandidates
                        candidates={myProvincialCandidates}
                        loading={loading}
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

export default RenderProvincialBallots