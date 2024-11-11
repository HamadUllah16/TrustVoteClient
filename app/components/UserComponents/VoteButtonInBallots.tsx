'use client'
import { castVote } from '@/app/redux/features/userSlice'
import { AppDispatch, RootState } from '@/app/redux/store'
import withAuth from '@/app/utils/withAuth'
import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

function VoteButtonInBallots({ candidate, assembly }: { candidate: any, assembly: string }) {
    const dispatch = useDispatch<AppDispatch>();
    const { status, electionSessionPublicKey } = useSelector((state: RootState) => state.electionSession.electionSession)
    const { naVote, paVote } = useSelector((state: RootState) => state.user.userProfile);
    const { loading } = useSelector((state: RootState) => state.user);
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
        toast.promise(
            dispatch(castVote({ candidateId: candidate._id, votingSessionPublicKey: electionSessionPublicKey }))
                .unwrap(), {
            loading: 'Loading...',
            success: 'Vote Casted Successfully.',
            error: 'Error while casting a vote.'
        }
        )
    }

    useEffect(() => {
        setDisabled(disableButton());
        console.log(electionSessionPublicKey)
    }, [])
    return (
        <Button
            fullWidth
            variant='contained'
            disabled={disabled || loading}
            onClick={voteCastingHandler}
        >
            Vote
        </Button>
    )
}

export default withAuth(VoteButtonInBallots)