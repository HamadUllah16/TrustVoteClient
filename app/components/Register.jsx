'use client'
import { East, Error, Visibility, VisibilityOff, Warning, WarningRounded } from '@mui/icons-material'
import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import Link from 'next/link'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../redux/features/authSlice'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import RegisterForm from './RegisterForm'

function Register() {
    const { error, message } = useSelector(state => state.auth);
    const router = useRouter();
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
            error: error ?? '',
            message: message ?? ''
        },
        enableReinitialize: true,
        onSubmit: values => {
            toast.promise(
                dispatch(registerUser({ account: { email: values.email, password: values.password }, router })).unwrap(), {
                loading: 'Loading...',
                success: 'Account created',
                error: err => err?.error
            }
            )
        },
        validate: values => {
            let errors = {};

            if (!values.email) {
                errors.email = 'Email cannot be empty';
            }
            if (!values.password) {
                errors.password = 'Password cannot be empty';
            }
            if (!values.confirmPassword) {
                errors.confirmPassword = 'Confirm Password cannot be empty';
            }

            return errors;
        }
    }
    )
    return (
        <Stack
            direction={'row'}
            bgcolor={'background.default'}
            width={'100vw'}
            height={'100vh'}
            p={2}
            border={'1px solid black'}
        >
            <Stack>
                <Image
                    src={'/logo-dark.jpg'}
                    height={50}
                    width={50}
                    alt='logo'
                />
                <Grid
                    px={'75px'}
                    display={"flex"}
                    justifyContent={"center"}
                    gap={2}
                    flexDirection={'column'}
                >
                    <Box
                        display={'flex'}
                        flexDirection={'column'}
                    >
                        <Typography variant='h4' fontWeight={'light'} color={'primary.main'}>
                            Create a new account
                        </Typography>
                        <Typography variant='body2' fontWeight={'light'} color={'primary.100'}>
                            Enter your details to register
                        </Typography>
                    </Box>

                    <Divider />

                    <Grid
                        display={'flex'}
                        flexDirection={'column'}
                        gap={3}
                    >
                        {/* ----------------------Registration Form----------------- */}
                        <RegisterForm
                            formik={formik}
                        />

                    </Grid>

                    <Divider />

                    <Link
                        href={"/user/login"}
                        className="arrowBox"
                    >
                        <Box
                            width={"fit-content"}
                            display={"flex"}
                            justifyContent={"start"}
                            alignItems={"center"}
                            gap={"3px"}
                            sx={{ textDecoration: "none", cursor: "pointer", ":hover": { textDecoration: "underline" } }}
                        >
                            <Typography variant='caption' color={"#5A5A5A"}>Already a member?</Typography>
                            <Typography variant='caption' color={"primary.main"} >Login</Typography>
                            <Box
                                className="rightArrow"
                                display={'flex'}
                                alignItems={'center'}
                                sx={{ "&.arrowBox:hover": { transform: "translate(10px)" }, transition: "all 0.3s ease" }}
                            >
                                <East color='primary' fontSize='inherit' />
                            </Box>
                        </Box>
                    </Link>
                </Grid>
            </Stack>

            <Stack flexGrow={1} borderRadius={2} bgcolor={'primary.main'}>

            </Stack>
        </Stack>
    )
}

export default Register