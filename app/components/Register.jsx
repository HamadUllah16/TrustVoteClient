'use client'
import { East, Error, Warning, WarningRounded } from '@mui/icons-material'
import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, Grid, Stack, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import Link from 'next/link'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../redux/features/authSlice'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

function Register() {
    const { error, message } = useSelector(state => state.auth);
    const [agree, setAgree] = useState(false);
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
            bgcolor={'white'}
            width={'100vw'}
            height={'100vh'}
            p={2}
            border={'1px solid black'}
        >
            <Stack>
                <Image
                    src={'/logo-dark.png'}
                    height={50}
                    width={50}
                    alt='logo'
                />
                <form style={{ display: 'flex', flexGrow: 1 }} onSubmit={formik.handleSubmit}>
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
                            <Typography variant='h6' fontWeight={'light'} color={'#5A5A5A'}>
                                Create a new account
                            </Typography>
                            <Typography variant='caption' fontWeight={'light'} color={'#5A5A5A'}>
                                Enter your details to register
                            </Typography>
                        </Box>

                        <Divider />

                        <Grid
                            display={'flex'}
                            flexDirection={'column'}
                            gap={3}
                        >
                            <Box
                                display={'flex'}
                                flexDirection={'column'}
                                gap={0.5}
                            >
                                <TextField
                                    error={formik.errors.email}
                                    name='email'
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    placeholder='youremail@example.com'
                                    label='Email'
                                />
                                {formik.errors.email &&
                                    <Typography variant='caption' color={'#d62f2f'}>
                                        <Error fontSize='small' /> {formik.errors.email}
                                    </Typography>
                                }
                            </Box>
                            <Box
                                display={'flex'}
                                flexDirection={'column'}
                                gap={0.5}
                            >
                                <TextField
                                    error={formik.errors.password}
                                    name='password'
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    type='password'
                                    label='Password'
                                />
                                {formik.errors.password &&
                                    <Typography variant='caption' color={'#d62f2f'}>
                                        <Error fontSize='small' /> {formik.errors.password}
                                    </Typography>
                                }
                            </Box>
                            <Box
                                display={'flex'}
                                flexDirection={'column'}
                                gap={0.5}
                            >
                                <TextField
                                    error={formik.errors.confirmPassword}
                                    name='confirmPassword'
                                    type='password'
                                    value={formik.values.confirmPassword}
                                    onChange={formik.handleChange}
                                    label='Confirm Password'
                                />
                                {formik.errors.confirmPassword &&
                                    <Typography variant='caption' color={'#d62f2f'}>
                                        <Error fontSize='small' /> {formik.errors.confirmPassword}
                                    </Typography>
                                }
                            </Box>
                        </Grid>

                        <FormControlLabel
                            control={<Checkbox checked={agree} onChange={() => setAgree(!agree)} />}
                            label={
                                <Typography variant="caption">
                                    I agree to TrustVote&apos;s terms and conditions.
                                </Typography>
                            }
                        />

                        <Button
                            type='submit'
                            disabled={!(formik.isValid && formik.dirty && agree)}
                            variant='contained'
                        >
                            Create Account
                        </Button>

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
                                <Typography variant='caption' color={"secondary.main"} >Login</Typography>
                                <Box
                                    className="rightArrow"
                                    display={'flex'}
                                    alignItems={'center'}
                                    sx={{ "&.arrowBox:hover": { transform: "translate(10px)" }, transition: "all 0.3s ease" }}
                                >
                                    <East color='secondary.main' fontSize='inherit' />
                                </Box>
                            </Box>
                        </Link>
                    </Grid>
                </form>
            </Stack>

            <Stack flexGrow={1} borderRadius={2} bgcolor={'primary.main'}>

            </Stack>
        </Stack>
    )
}

export default Register