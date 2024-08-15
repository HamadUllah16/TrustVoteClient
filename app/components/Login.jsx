"use client"
import { Grid, Typography, Box, Button, Link, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import { East } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/features/authSlice';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';

function Login() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { isAuthenticated } = useSelector(state => state.auth)
    const { profileCompletion } = useSelector((state) => state.user.userProfile)

    useEffect(() => {
        if (isAuthenticated) {
            if (!profileCompletion) {
                router.push('/user/update-profile')
            }
            router.push('/')
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
            const errors = {};

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
            <Grid
                backgroundColor={"white"}
                display={"flex"}
                justifyContent={"center"}
                p={"10px"}
                borderRadius={2}
                gap={3}
                boxShadow={20}
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
                        disabled={!formik.isValid || !formik.dirty}
                        variant='contained'
                        onClick={formik.handleSubmit}
                    >
                        Continue
                    </Button>

                    <Box>
                        <hr style={{ color: "#5A5A5A" }}></hr>
                        <Link
                            href={"#login"}
                            className="arrowBox"
                            width={"fit-content"}
                            display={"flex"}
                            justifyContent={"start"}
                            alignItems={"center"}
                            gap={"3px"}
                            sx={{ textDecoration: "none", cursor: "pointer", ":hover": { textDecoration: "underline" } }}
                        >
                            <Typography variant='caption' color={"#5A5A5A"}>New to TrustVote?</Typography>
                            <Typography variant='caption' color={"secondary.main"} >Get started</Typography>
                            <Box
                                className="rightArrow"
                                sx={{ "&.arrowBox:hover": { transform: "translate(10px)" }, transition: "all 0.3s ease" }}
                            >
                                <East color='secondary.main' fontSize='inherit' />
                            </Box>
                        </Link>
                    </Box>
                </Grid>

                <Grid>
                    <Box
                        width={"370px"}
                        minHeight={"100%"}
                        backgroundColor={"primary.main"}
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
    );
}

export default Login;
