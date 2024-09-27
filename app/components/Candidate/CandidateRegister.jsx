'use client'
import { East, Visibility, VisibilityOff } from '@mui/icons-material'
import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, FormGroup, Grid, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { completeCandidateProfile, createCandidateProfile } from '../../redux/features/candidateSlice'
import { useRouter } from 'next/navigation'
import RegisterForm from '../RegisterForm'
import Link from 'next/link'
import Image from 'next/image'
import toast from 'react-hot-toast'

function CandidateRegister() {
    const [showPassword, setShowPassword] = useState(false);
    const [termsChecked, setTermsChecked] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const validationSchemaStep1 = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string()
            .min(8, 'Password should be of minimum 8 characters length')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Confirm Password is required'),
    });
    const formikStep1 = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: validationSchemaStep1,
        onSubmit: (values) => {
            const { email, password } = values;
            toast.promise(
                dispatch(createCandidateProfile({ profile: { email, password }, router: router })).unwrap(), {
                loading: 'Loading...',
                success: 'Authenticated',
                error: err => err.message
            }
            )
        },
    });

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
                            formik={formikStep1}
                        />

                    </Grid>

                    <Divider />

                    <Link
                        href={"/candidate/login"}
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

export default CandidateRegister
