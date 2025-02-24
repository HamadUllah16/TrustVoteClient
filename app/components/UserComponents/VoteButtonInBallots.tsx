'use client'
import { castVote } from '@/app/redux/features/userSlice'
import { AppDispatch, RootState } from '@/app/redux/store'
import withAuth from '@/app/utils/withAuth'
import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import socket from '../Utils/socket'

function VoteButtonInBallots({ candidate }: { candidate: any }) {
    const dispatch = useDispatch<AppDispatch>();
    const { status, electionSessionPublicKey } = useSelector((state: RootState) => state.electionSession.electionSession)
    const { naVote, paVote, _id } = useSelector((state: RootState) => state.user.userProfile);
    const { loading } = useSelector((state: RootState) => state.user);
    const [disabled, setDisabled] = useState(true);

    function disableButton() {
        if (status === 'scheduled' || status === 'paused' || status === 'ended') {
            return true
        }
        else if (candidate.constituencyType === 'national assembly' && naVote) {
            return false;
        }
        else if (candidate.constituencyType === 'provincial assembly' && paVote) {
            return false;
        }
        else {
            return true
        }
    }
    const voteCastingHandler = () => {
        toast.promise(
            dispatch(castVote({ candidateId: candidate._id, votingSessionPublicKey: electionSessionPublicKey }))
                .unwrap(),
            {
                loading: 'Loading...',
                success: ({ tx }) => (
                    <div>
                        Vote Casted Successfully.{' '}
                        <a
                            href={`https://explorer.solana.com/tx/${tx}?cluster=devnet`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline"
                        >
                            Verify
                        </a>
                    </div>
                ),
                error: 'Error while casting a vote.'
            }
        ).then((txSignature) => {
            socket.emit('newVote', { voterId: _id, candidateId: candidate._id, txSignature })
        });
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