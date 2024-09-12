import React from 'react'
import CompleteProfile from '@/app/components/CompleteProfile';
import { Stack } from '@mui/material';

function UpdateProfile() {
    return (
        <Stack
            display={'flex'}
            justifyContent={'center'}
            gap={2}
            alignItems={'center'}
            px={'75px'}
            py={'15px'}
            width={'100%'}
        >
            <CompleteProfile />
        </Stack>
    )
}

export default UpdateProfile