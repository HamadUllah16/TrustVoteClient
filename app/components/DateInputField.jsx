import { Error } from '@mui/icons-material';
import { Box, Typography, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import React from 'react';

function DateInputField({ formik, ...props }) {

    return (
        <Box
            display={'flex'}
            flexDirection={'column'}
            gap={0.5}
        >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    {...props}
                    value={dayjs(formik.values.date)}
                    onChange={(newValue) => {
                        formik.setFieldValue('date', newValue);
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            name='date'
                            error={formik.touched && formik.errors.date}
                            helperText={formik.touched && formik.errors.date}
                            onBlur={formik.handleBlur}

                        />
                    )}
                />
            </LocalizationProvider>
        </Box>
    );
}

export default DateInputField;
