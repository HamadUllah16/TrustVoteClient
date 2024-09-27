import { Error } from '@mui/icons-material';
import { Box, Typography, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import React from 'react';

function DateInputField({ ...props }) {
    return (
        <Box display={'flex'} flexDirection={'column'} gap={0.5}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    {...props}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                        />
                    )}
                />
            </LocalizationProvider>
        </Box>
    );
}

export default DateInputField;
