import { Flag, HowToVote, People } from '@mui/icons-material'
import { Stack, Typography, MenuItem } from '@mui/material'
import Link from 'next/link'
import React from 'react'

function CandidateSidebarMenus() {
    return (
        <Stack>
            <Link href={'/user/cast-a-vote'}>
                <MenuItem sx={{ borderRadius: 1 }}>
                    <Typography variant='subtitle1' color={'grey'} display={'flex'} gap={1} alignItems={'center'}>
                        <HowToVote fontSize='medium' />
                        Cast a Vote
                    </Typography>
                </MenuItem>
            </Link>

            <Link href={'/user/view-candidates'}>
                <MenuItem sx={{ borderRadius: 1 }}>
                    <Typography variant='subtitle1' color={'grey'} display={'flex'} gap={1} alignItems={'center'}>
                        <People fontSize='medium' />
                        View Candidates
                    </Typography>
                </MenuItem>
            </Link>

            <Link href={'/user/view-political-parties'}>
                <MenuItem sx={{ borderRadius: 1 }}>
                    <Typography variant='subtitle1' color={'grey'} display={'flex'} gap={1} alignItems={'center'}>
                        <Flag fontSize='medium' />
                        View Political Parties
                    </Typography>
                </MenuItem>
            </Link>
        </Stack>
    )
}

export default CandidateSidebarMenus