'use client';
import { Check } from '@mui/icons-material';
import { Divider, LinearProgress, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';

function ProfileCompletionVerificationStatus() {
    const { email, constituency, phone, profileCompletion } = useSelector(
        (state: RootState) => state.user.userProfile
    );

    const [progress, setProgress] = useState(0);

    // Function to calculate the progress percentage
    const calculateProgress = () => {
        let progressCount = 0;
        if (email) progressCount += 25;
        if (phone) progressCount += 25;
        if (constituency) progressCount += 25;
        if (profileCompletion) progressCount += 25;
        return progressCount;
    };

    useEffect(() => {
        setProgress(calculateProgress());
    }, [email, phone, constituency, profileCompletion]);

    return (
        <Stack
            gap={2}
            border={'1px solid'}
            borderColor={'secondary.200'}
            borderRadius={1}
            p={3}
            width={'100%'}
        >
            <Stack gap={2}>
                <Stack gap={1}>
                    <Typography color={'primary.main'} variant='h6'>
                        Profile Completion
                    </Typography>
                    <Stack gap={1}>
                        {/* Display progress bar */}
                        <LinearProgress
                            variant='determinate'
                            value={progress}
                            sx={{ borderRadius: 5, overflow: 'hidden' }}
                        />
                        <Typography color='primary.main' textAlign={'end'}>
                            {progress}%
                        </Typography>
                    </Stack>
                </Stack>

                <Divider sx={{ borderColor: 'secondary.200' }} />
            </Stack>

            {/* Checklist Section */}
            <Stack gap={1}>
                <Stack direction={'row'} gap={1}>
                    <Check htmlColor={email ? '#22BB33' : 'gray'} />
                    <Typography color={'primary.100'}>{email ? 'Email added.' : 'Add an email.'}</Typography>
                </Stack>

                <Stack direction={'row'} gap={1}>
                    <Check htmlColor={phone ? '#22BB33' : 'gray'} />
                    <Typography color={'primary.100'}>{phone ? 'Phone number added.' : 'Add a phone number.'}</Typography>
                </Stack>

                <Stack direction={'row'} gap={1}>
                    <Check htmlColor={'#22BB33'} />
                    <Typography color={'primary.100'}>
                        {constituency ? 'Constituency selected.' : 'Add constituency.'}

                    </Typography>
                </Stack>

                <Stack direction={'row'} gap={1}>
                    <Check htmlColor={profileCompletion ? '#22BB33' : 'gray'} />
                    <Typography color={'primary.100'}>
                        {profileCompletion ? 'Nationality verified' : 'Verify nationality'}
                    </Typography>
                </Stack>
            </Stack>
        </Stack>
    );
}

export default ProfileCompletionVerificationStatus;
