import { Box, CircularProgress } from '@mui/material'
import React from 'react'
import Modal from "./Modal";

function Loading() {
    return (
        <Modal>
            <Box
                position={'absolute'}
                sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        </Modal>
    )
}

export default Loading