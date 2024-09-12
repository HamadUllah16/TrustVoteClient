"use client"
import { Grid, Typography, Box, Button, TextField, Stack, CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/features/authSlice';
import { FormikValues, useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AppDispatch, RootState } from '../redux/store';
import { getUserProfile } from '../redux/features/userSlice';

function Login() {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { loading, isAuthenticated } = useSelector((state: RootState) => state.auth)

    useEffect(() => {
        if (isAuthenticated && !loading) {
            router.push('/home')
        }
    }, [loading, isAuthenticated])

    useEffect(() => {
        const token = localStorage.getItem('x_auth_token');
        if (token && !isAuthenticated) {
            dispatch(getUserProfile());
        }
    }, [isAuthenticated])

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: values => {
            const { email, password } = values;
            console.log(email, password)
            dispatch(loginUser({ email, password }));
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
        <form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
            <Grid
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                py={4}
                width={'100%'}
            >
                <Grid
                    bgcolor={"white"}
                    display={"flex"}
                    justifyContent={"center"}
                    p={"10px"}
                    borderRadius={2}
                    gap={3}
                    boxShadow={3}
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
                            <Typography variant='h6' color={"#5A5A5A"} fontWeight={"light"}>Login to continue</Typography>
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
                            disabled={!(formik.isValid && formik.dirty && !loading)}
                            variant='contained'
                            type='submit'
                        >
                            {loading ?
                                <CircularProgress size={24} />
                                :
                                'Continue'
                            }
                        </Button>

                        <Stack>
                            <hr style={{ color: "#5A5A5A" }}></hr>
                            <Link
                                href={"/user/login"}>
                                <Typography variant='caption' color={"#5A5A5A"}>New to TrustVote? </Typography>
                                <Typography variant='caption' color={"secondary.main"} sx={{ textDecoration: 'underline' }}>Register</Typography>
                            </Link>
                            <Link href='/candidate/login'>
                                <Typography variant='caption' color={"secondary.main"} >Login as Candidate</Typography>
                            </Link>
                        </Stack>
                    </Grid>

                    <Grid>
                        <Box
                            width={"370px"}
                            minHeight={"100%"}
                            bgcolor={"primary.main"}
                            borderRadius={2}
                            display={"flex"}
                            justifyContent={"center"}
                            alignItems={"center"}
                        >
                            <Typography variant='h4' color={"white"} textAlign={"center"}></Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    );
}

export default Login;
