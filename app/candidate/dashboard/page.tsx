import Sidebar from '@/app/components/Sidebar'
import { MenuItem, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'

function DashboardPage() {
    return (
        <Stack
            direction={'row'}
            gap={3}
        >

            <Sidebar>
                <Stack
                    gap={2}
                >
                    <Typography
                        variant='subtitle2'
                        color={'grey'}
                        textTransform={'uppercase'}
                    >

                    </Typography>

                    <Stack
                        gap={0.3}
                    >
                        <MenuItem >
                            <Link href={'/admin/dashboard/candidates/list'}>
                                <Typography variant='body1' color={'grey'} display={'flex'} gap={1} alignItems={'center'} >

                                    List
                                </Typography>
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            <Typography variant='body1' color={'grey'} display={'flex'} gap={1} alignItems={'center'} >

                                Requests
                            </Typography>
                        </MenuItem>
                    </Stack>
                </Stack>
            </Sidebar>
        </Stack>
    )
}

export default DashboardPage