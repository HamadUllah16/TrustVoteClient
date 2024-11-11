import { Box, Divider, Stack, Typography } from '@mui/material'
import React from 'react'

function PageHeader({ title, action, subtitle, children }: { title: string, subtitle: string | null, action: null | React.ReactNode, children: null | React.ReactNode }) {
    return (
        <Stack
            flex={1}
            gap={4}
            py={3}
        >
            <Box>
                <Stack direction={'row'} gap={1} justifyContent={'space-between'}>

                    <Typography variant='h4' fontWeight={'bold'} color={'primary.main'}>
                        {title}
                    </Typography>

                    {action}
                </Stack>
                <Typography variant='h6' color={'primary.100'}>
                    {subtitle}
                </Typography>
            </Box>
            <Divider sx={{ bgcolor: 'secondary.200' }} />

            {children}
        </Stack>
    )
}

export default PageHeader