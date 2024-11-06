'use client'
import { castVote } from '@/app/redux/features/userSlice'
import { AppDispatch, RootState } from '@/app/redux/store'
import withAuth from '@/app/utils/withAuth'
import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function VoteButtonInBallots({ candidate, assembly }: { candidate: any, assembly: string }) {
    const dispatch = useDispatch<AppDispatch>();
    const { status, electionSessionPublicKey } = useSelector((state: RootState) => state.electionSession.electionSession)
    const { naVote, paVote } = useSelector((state: RootState) => state.user.userProfile);
    const [disabled, setDisabled] = useState(true);

    function disableButton() {
        if (status === 'scheduled' || status === 'paused' || status === 'ended') {
            return true
        }
        else if (assembly === 'national' && naVote) {
            return false;
        }
        else if (assembly === 'provincial' && paVote) {
            return false;
        }
        else {
            return true
        }
    }
    const voteCastingHandler = () => {
        dispatch(castVote({ candidateId: candidate._id, votingSessionPublicKey: electionSessionPublicKey }));
    }

    useEffect(() => {
        setDisabled(disableButton());
        console.log(electionSessionPublicKey)
    }, [])
    return (
        <Button
            fullWidth
            variant='contained'
            disabled={disabled}
            onClick={voteCastingHandler}
        >
            Vote
        </Button>
    )
}

export default withAuth(VoteButtonInBallots)