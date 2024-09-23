import { HowToReg, PendingActions, RecentActors } from '@mui/icons-material'
import { Stack, Typography, MenuItem } from '@mui/material'
import Link from 'next/link'

import React from 'react'
function AdminRoutes() {
    return (
        <Stack
            gap={2}
        >
            <Typography
                variant='subtitle2'
                color={'grey'}
                textTransform={'uppercase'}
            >
                Candidates
            </Typography>

            <Stack
                gap={0.3}
            >
                <Link href={'/admin/dashboard/candidates/list'}>
                    <MenuItem >
                        <Typography variant='body1' color={'grey'} display={'flex'} gap={1} alignItems={'center'} >
                            <RecentActors fontSize='medium' />
                            Nominated Candidates
                        </Typography>
                    </MenuItem>
                </Link>
                <Link href={'/admin/dashboard/candidates/pending-candidates'}>
                    <MenuItem >
                        <Typography variant='body1' color={'grey'} display={'flex'} gap={1} alignItems={'center'} >
                            <PendingActions fontSize='medium' />
                            Pending Candidates
                        </Typography>
                    </MenuItem>
                </Link>
            </Stack>
        </Stack>
    )
}

export default AdminRoutes