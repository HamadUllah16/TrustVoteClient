"use client"
import { Grid, Typography, Box, Button, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormikValues, useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AppDispatch, RootState } from '@/app/redux/store';
import { loginCandidate } from '@/app/redux/features/authSlice';

function CandidateLogin() {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { isAuthenticated } = useSelector((state: RootState) => state.auth)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: values => {
            const { email, password } = values;
            console.log(email, password)
            dispatch(loginCandidate({ email, password }));
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
    useEffect(() => {
        if (isAuthenticated) {
            router.push('/candidate')
        }

    }, [isAuthenticated])

    return (
        <Grid
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            py={4}
            width={'100%'}
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
                            <Typography variant='h6' color={"#5A5A5A"} fontWeight={"light"}>Login with your Candidate account to continue</Typography>
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

                        <Box>
                            <hr style={{ color: "#5A5A5A" }}></hr>
                            <Link
                                href={"#login"}
                                className="arrowBox"
                                style={{ textDecoration: "none", cursor: "pointer" }}
                            >
                                <Typography variant='caption' color={"#5A5A5A"}>New to TrustVote? </Typography>
                                <Typography variant='caption' color={"secondary.main"} >Register as Candidate</Typography>

                            </Link>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </Grid>
    );
}

export default CandidateLogin;
