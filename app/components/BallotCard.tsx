import { Button, Stack, Typography } from '@mui/material'
import React from 'react'

function BallotCard({ candidate }: { candidate: any }) {
    return (

        <Stack
            border={'1px solid'}
            borderColor={'secondary.200'}
            borderRadius={1}
            p={2}
        >
            <Stack direction={'row'} gap={1}>
                <Typography color={'secondary.100'} variant='subtitle1' fontWeight={'bold'}>
                    {candidate.firstName}
                </Typography>
                <Typography color={'primary.200'} variant='subtitle1'>
                    {candidate.lastName}
                </Typography>
            </Stack>

            <Typography textTransform={'capitalize'} variant='subtitle2' color={'primary.200'}>
                Assembly: {candidate.constituencyType}
            </Typography>

            <Typography textTransform={'capitalize'} variant='subtitle2' color={'primary.200'}>
                Constituency: {candidate.constituency}
            </Typography>

            <Typography textTransform={'capitalize'} variant='subtitle2' color={'primary.200'}>
                Party: {candidate.partyAffiliation}
            </Typography>

            <Stack direction={'row'} gap={1} pt={1}>
                <Button fullWidth variant='contained'>
                    Vote
                </Button>
            </Stack>


        </Stack>
    )
}

export default BallotCard