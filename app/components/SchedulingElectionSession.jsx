'use client'
import { Button, Stack, TextField } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { scheduleElectionSession } from '../redux/features/electionSessionSlice';
import toast from 'react-hot-toast';

// Validation schema
const validationSchema = Yup.object({
  dateTime: Yup.date()
    .min(dayjs(), "Please select a future date and time.")
    .required("Date and time are required"),
  sessionName: Yup.string().min(5, 'Minimum 5 characters.').required('Session Name is required.')
});

function SchedulingElectionSession() {
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{ dateTime: null, sessionName: '', status: 'scheduled', electionSessionPublicKey: '' }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        const formattedValues = {
          ...values,
          dateTime: dayjs(values.dateTime).toISOString(), // Use ISO format for consistency
        };
        toast.promise(
          dispatch(scheduleElectionSession(formattedValues)).unwrap(), {
          loading: 'Hang in there...',
          success: `${values.sessionName} scheduled!`,
          error: `Could not schedule ${values.sessionName}`
        }
        )
      }}
    >
      {({ values, errors, touched, setFieldValue }) => (
        <Form>
          <Stack spacing={2}>
            <Stack gap={1}>
              <TextField
                variant='filled'
                name='sessionName'
                label='Session Name'
                placeholder='General Elections 2024'
                onChange={(e) => setFieldValue('sessionName', e.target.value)}
                helperText={touched.sessionName && errors.sessionName}
                error={touched.sessionName && Boolean(errors.sessionName)}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Select Date & Time"
                  value={values.dateTime}
                  onChange={(newValue) => setFieldValue("dateTime", newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant='filled'
                      error={touched.dateTime && Boolean(errors.dateTime)}
                      helperText={touched.dateTime && errors.dateTime}
                    />
                  )}
                  minDateTime={dayjs()} // Prevent past date and time selection
                />
              </LocalizationProvider>
            </Stack>

            <Button type="submit" variant="outlined">
              Schedule
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}

export default SchedulingElectionSession;
