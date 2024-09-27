'use client'
import { CircularProgress, Stack } from '@mui/material'
import React from 'react'
function Loading() {
    return (
        <Stack flexGrow={1} alignItems={'center'} justifyContent={'center'}>
            <CircularProgress />
        </Stack>

    )
}

export default Loading;