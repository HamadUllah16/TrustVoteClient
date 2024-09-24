import { Groups, HowToReg, PendingActions, RecentActors } from '@mui/icons-material'
import { Stack, Typography, MenuItem, Divider } from '@mui/material'
import Link from 'next/link'

import React from 'react'
function AdminRoutes() {
    return (
        <Stack
            gap={2}
        >
            {/* Candidates routes */}
            <Stack>
                <Typography
                    variant='subtitle2'
                    color={'grey'}
                    textTransform={'uppercase'}
                >
                    Candidates
                </Typography>

                <Stack
                    gap={0.2}
                >
                    <Link href={'/admin/dashboard/candidates/list'}>
                        <MenuItem >
                            <Typography variant='body2' color={'grey'} display={'flex'} gap={1} alignItems={'center'} >
                                <RecentActors fontSize='medium' />
                                Nominated Candidates
                            </Typography>
                        </MenuItem>
                    </Link>
                    <Link href={'/admin/dashboard/candidates/pending-candidates'}>
                        <MenuItem >
                            <Typography variant='body2' color={'grey'} display={'flex'} gap={1} alignItems={'center'} >
                                <PendingActions fontSize='medium' />
                                Pending Candidates
                            </Typography>
                        </MenuItem>
                    </Link>
                </Stack>
            </Stack>

            <Divider />

            {/* Political Party routes */}
            <Stack>
                <Typography
                    variant='subtitle2'
                    color={'grey'}
                    textTransform={'uppercase'}
                >
                    Political Parties
                </Typography>

                <Stack
                    gap={0.2}
                >
                    <Link href={'/admin/dashboard/political-parties/list'}>
                        <MenuItem >
                            <Typography variant='body2' color={'grey'} display={'flex'} gap={1} alignItems={'center'} >
                                <Groups fontSize='medium' />
                                All Political Parties
                            </Typography>
                        </MenuItem>
                    </Link>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default AdminRoutes