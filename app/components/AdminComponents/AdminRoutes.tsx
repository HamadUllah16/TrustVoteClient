import { HowToReg, RecentActors } from '@mui/icons-material'
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
                <MenuItem >
                    <Link href={'/admin/dashboard/candidates/list'}>
                        <Typography variant='body1' color={'grey'} display={'flex'} gap={1} alignItems={'center'} >
                            <RecentActors fontSize='medium' />
                            List
                        </Typography>
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Typography variant='body1' color={'grey'} display={'flex'} gap={1} alignItems={'center'} >
                        <HowToReg fontSize='medium' />
                        Requests
                    </Typography>
                </MenuItem>
            </Stack>
        </Stack>
    )
}

export default AdminRoutes