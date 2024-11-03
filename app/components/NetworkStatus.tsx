'use client'
import { SignalWifiConnectedNoInternet4 } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

function NetworkStatus() {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    useEffect(() => {
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        console.log(isOnline)

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, [isOnline]);

    return (
        <Stack
            direction={'row'}
            justifyContent={'center'}
            alignItems="center"
            p={1}
            bgcolor={'primary.main'}
            overflow={'hidden'}
            sx={{
                transition: 'all 0.5s ease',
                opacity: isOnline ? 0 : 1,
                transform: isOnline ? 'translateY(-100%)' : 'translateY(0)',
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
            }}
        >
            <Stack direction={'row'} gap={1} alignItems="center">
                <SignalWifiConnectedNoInternet4 />
                <Typography>
                    Network disconnected...
                </Typography>
            </Stack>
        </Stack>
    );
}

export default NetworkStatus;
