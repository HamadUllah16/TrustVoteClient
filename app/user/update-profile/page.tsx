import React from 'react'
import CompleteProfile from '@/app/components/CompleteProfile';
import { Grid } from '@mui/material';

function UpdateProfile() {
    return (
        <Grid
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            p={5}
        >
            <CompleteProfile />
        </Grid>
    )
}

export default UpdateProfile