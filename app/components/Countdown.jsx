import React, { useEffect, useState } from 'react';
import { Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';

function Countdown({ scheduledTime }) {
    const [timeRemaining, setTimeRemaining] = useState("");

    useEffect(() => {
        // Update the countdown every second
        const interval = setInterval(() => {
            const now = dayjs();
            const targetTime = dayjs(scheduledTime);
            const diff = targetTime.diff(now);

            if (diff <= 0) {
                setTimeRemaining("Refresh...");
                clearInterval(interval);
            } else {
                const days = targetTime.diff(now, 'day');
                const hours = targetTime.diff(now, 'hour') % 24;
                const minutes = targetTime.diff(now, 'minute') % 60;
                const seconds = targetTime.diff(now, 'second') % 60;

                setTimeRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`);
            }
        }, 1000);

        // Clear interval on component unmount
        return () => clearInterval(interval);
    }, [scheduledTime]);

    return (
        <Stack p={2} width={200}>
            <Typography variant='subtitle1' color='secondary.300'>Time Remaining</Typography>
            <Typography variant='h5' color='secondary.100'>
                {timeRemaining}
            </Typography>
        </Stack>
    );
}

export default Countdown;
