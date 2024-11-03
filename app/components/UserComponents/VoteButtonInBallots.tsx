'use client'
import { RootState } from '@/app/redux/store'
import { Button } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

function VoteButtonInBallots() {
    const { loading, electionSession } = useSelector((state: RootState) => state.electionSession)
    return (
        <Button
            fullWidth
            variant='contained'
            disabled={electionSession.status === 'scheduled' || electionSession.status === 'paused' || electionSession.status === 'ended'}
        >
            Vote
        </Button>
    )
}

export default VoteButtonInBallots