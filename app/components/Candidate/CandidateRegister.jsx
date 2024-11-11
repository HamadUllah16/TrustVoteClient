'use client'
import { ArrowBack, East, Info } from '@mui/icons-material'
import { Box, Divider, Grid, IconButton, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { completeCandidateProfile, createCandidateProfile } from '../../redux/features/candidateSlice'
import { useRouter } from 'next/navigation'
import RegisterForm from '../RegisterForm'
import Link from 'next/link'
import Image from 'next/image'
import toast from 'react-hot-toast'
import Modal from '../Modal'
import { getElectionSession } from '@/app/redux/features/electionSessionSlice'

function CandidateRegister() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { status } = useSelector(state => state.electionSession.electionSession)


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
                success: 'Account created',
                error: err => err.message
            }
            )
        },
    });

    useEffect(() => {
        dispatch(getElectionSession());
    }, [])

    return (
        <>
            {
                (status === 'active' || status === 'paused') &&
                <Modal>
                    <Stack
                        p={2}
                        border={'1px solid'}
                        borderColor={'primary.200'}
                        borderRadius={1}
                        bgcolor={'background.default'}
                        gap={1}
                    >
                        <Stack width={'fit-content'} position={'fixed'}>
                            <IconButton href='/'>
                                <ArrowBack sx={{ color: 'primary.main' }} />
                            </IconButton>
                        </Stack>

                        <Stack alignItems={'center'} >
                            <Info sx={{ color: 'primary.main' }} fontSize='large' />
                            <Typography
                                variant='h5'
                                color={'primary.main'}
                            >
                                Active Election Session

                            </Typography>
                        </Stack>
                        <Typography variant='subtitle1' color={'primary.200'} maxWidth={600} textAlign={'center'}>
                            There is an active election session. New candidates cannot be processd right now.
                        </Typography>
                    </Stack>
                </Modal>
            }
            <Stack
                direction={'row'}
                bgcolor={'secondary.main'}
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
                        style={{
                            borderRadius: '12px',
                            rotate: '90deg'
                        }}
                    />
                    <Stack
                        px={'75px'}
                        display={"flex"}
                        justifyContent={"center"}
                        gap={2}
                        flexDirection={'column'}
                        divider={<Divider sx={{ borderColor: 'secondary.200' }} />}
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
                    </Stack>
                </Stack>

                <Stack flexGrow={1} borderRadius={2} bgcolor={'primary.main'}>

                </Stack>
            </Stack>

        </>
    )
}

export default CandidateRegister
