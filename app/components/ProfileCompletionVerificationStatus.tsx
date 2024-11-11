import { Check, Verified } from '@mui/icons-material'
import { Divider, LinearProgress, Stack, Typography } from '@mui/material'
import React from 'react'

function ProfileCompletionVerificationStatus() {
    return (
        <Stack
            gap={2}
            border={'1px solid'}
            borderColor={'secondary.200'}
            borderRadius={1}
            p={3}
            width={'100%'}
        >
            <Stack
                gap={2}
            >
                <Stack gap={1}>
                    <Typography color={'primary.main'} variant='h6'>
                        Profile completion
                    </Typography>
                    <Stack gap={1}>
                        <LinearProgress variant='determinate' value={90} sx={{ borderRadius: 5, overflow: 'hidden' }} />
                        <Typography color='primary.main' textAlign={'end'}>
                            90%
                        </Typography>
                    </Stack>
                </Stack>

                <Divider sx={{ borderColor: 'secondary.200' }} />
            </Stack>

            <Stack
                gap={1}
            >

                <Stack direction={'row'} gap={1}>
                    <Check htmlColor={'#22BB33'} />
                    <Typography color={'primary.100'}>
                        Add an email.
                    </Typography>
                </Stack>

                <Stack direction={'row'} gap={1}>
                    <Check htmlColor={'#22BB33'} />
                    <Typography color={'primary.100'}>
                        Add a phone number.
                    </Typography>
                </Stack>

                <Stack direction={'row'} gap={1}>
                    <Check htmlColor={'#22BB33'} />
                    <Typography color={'primary.100'}>
                        Select a constituency.
                    </Typography>
                </Stack>

                <Stack direction={'row'} gap={1}>
                    <Check htmlColor={'#22BB33'} />
                    <Typography color={'primary.100'}>
                        Verify nationality.
                    </Typography>
                </Stack>

            </Stack>
        </Stack>
    )
}

export default ProfileCompletionVerificationStatus