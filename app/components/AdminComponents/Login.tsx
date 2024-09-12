"use client"
import { Grid, Typography, Box, Button, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import { East } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { FormikValues, useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AppDispatch, RootState } from '@/app/redux/store';
import { loginAdmin } from '@/app/redux/features/adminSlice';

function Login() {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: values => {
            const { email, password } = values;
            console.log(email, password)
            dispatch(loginAdmin({ credentials: values, router }));
        },
        validate: values => {
            const errors: FormikValues = {};

            if (!values.email) {
                errors.email = 'Email cannot be empty';
            } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(values.email)) {
                errors.email = 'Invalid email';
            }

            if (!values.password) {
                errors.password = 'Password cannot be empty';
            }

            return errors;
        }
    });

    return (
        <Grid
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            py={4}
        >
            <form onSubmit={formik.handleSubmit}>

                <Grid
                    bgcolor={"white"}
                    display={"flex"}
                    justifyContent={"center"}
                    p={"10px"}
                    borderRadius={2}
                    gap={3}
                    boxShadow={10}
                >
                    <Grid
                        p={"50px"}
                        display={"flex"}
                        flexDirection={"column"}
                        gap={3}
                    >
                        <Box
                            display={"flex"}
                            flexDirection={"column"}
                            gap="5px"
                        >
                            <Typography variant='h3'>Welcome Back!</Typography>
                            <Typography variant='h6' color={"#5A5A5A"} fontWeight={"light"}>Login as Admin to continue</Typography>
                        </Box>

                        <TextField
                            name='email'
                            label={'Email'}
                            placeholder='example@email.com'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            required
                        />

                        <TextField
                            name='password'
                            label={'Password'}
                            placeholder='example123@'
                            type='password'
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            required
                        />

                        <Button
                            fullWidth
                            disabled={!formik.isValid || !formik.dirty}
                            variant='contained'
                            type='submit'
                        >
                            Continue
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Grid>
    );
}

export default Login;
