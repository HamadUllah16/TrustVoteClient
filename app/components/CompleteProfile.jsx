'use client'
import { Box, Grid, TextField, Typography, Button, Divider, Stack, IconButton, MenuItem, Autocomplete } from '@mui/material'
import { useFormik } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import NationalityVerification from '@/app/components/NationalityVerification';
import { Add, Error, Upload, UploadFile, Verified } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../redux/features/userSlice';
import DateInputField from "./DateInputField";
import Loading from './Loading';
import { updateProfile } from '../redux/features/profileCompletionSlice';
import dayjs from 'dayjs';
import withAuth from '../utils/withAuth';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import UserAddressConstituency from './UserAddressConstituency';
import checkChanged from './checkChanged';
import ProfilePicture from './ProfilePicture';



function CompleteProfile() {
    const { userProfile, loading } = useSelector(state => state.user)
    const { isAuthenticated } = useSelector(state => state.auth)

    const router = useRouter();
    const dispatch = useDispatch();
    useEffect(() => {
        if (!isAuthenticated) {
            dispatch(getUserProfile())
        }
    }, [dispatch])

    const formik = useFormik({
        initialValues: {
            profilePicture: userProfile.profilePicure ?? '',
            firstName: userProfile.firstName ?? '',
            lastName: userProfile.lastName ?? '',
            email: userProfile?.email ?? '',
            phone: userProfile.phone ?? '',
            cnic: userProfile.cnic ?? '',
            date: userProfile.dateOfBirth ?? '',
            cnicFront: userProfile.cnicFront ?? '',
            cnicBack: userProfile.cnicBack ?? '',
            province: userProfile.province ?? '',
            constituency: userProfile.constituency ?? '',
            provincialConstituency: userProfile.provincialConstituency ?? ''
        },
        enableReinitialize: true,
        onSubmit: values => {
            console.log(values)
            const { date, ...otherValues } = values;
            const changed = checkChanged(formik, values)
            console.log(changed)
            const token = localStorage.getItem('x_auth_token')
            toast.promise(
                dispatch(updateProfile({
                    router,
                    profile: {
                        ...changed
                        // dateOfBirth: dayjs(date).format('YYYY-MM-DD')
                    },
                    token
                })).unwrap(), {
                loading: 'Updating profile',
                success: 'Profile updated',
                error: err => err?.message
            }
            )

        },
        validate: values => {
            const errors = {};

            // Validate first name
            if (!values.firstName) {
                errors.firstName = 'First Name is required';
            } else if (values.firstName.length < 2) {
                errors.firstName = 'First Name must be at least 2 characters';
            }

            // Validate last name
            if (!values.lastName) {
                errors.lastName = 'Last Name is required';
            } else if (values.lastName.length < 2) {
                errors.lastName = 'Last Name must be at least 2 characters';
            }

            // Validate email
            if (!values.email) {
                errors.email = 'Email is required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            // Validate phone
            if (!values.phone) {
                errors.phone = 'Phone number is required';
            } else if (!/^\d{10,15}$/i.test(values.phone)) {
                errors.phone = 'Phone number must be between 10 and 15 digits';
            }

            // Validate CNIC front
            if (!values.cnicFront) {
                errors.cnicFront = 'Front side of CNIC is required';
            }

            // Validate CNIC back
            if (!values.cnicBack) {
                errors.cnicBack = 'Back side of CNIC is required';
            }
            if (!values.cnic) {
                errors.cnic = 'CNIC Number cannot be empty.'
            }
            if (!/^\d{5}-\d{7}-\d{1}$/.test(values.cnic)) {
                errors.cnic = 'Invalid CNIC Number'
            }
            if (!values.province) {
                errors.province = 'Please select a province'
            }
            if (!values.constituency) {
                errors.constituency = 'Please select a constituency'
            }
            if (!values.provincialConstituency) {
                errors.provincialConstituency = 'Please select a provincial constituency'
            }
            if (!values.date) {
                errors.date = 'Date of Birth cannot be empty';
            } else {
                const today = new Date();
                const dob = new Date(values.date);
                const age = today.getFullYear() - dob.getFullYear();
                const monthDifference = today.getMonth() - dob.getMonth();
                const dayDifference = today.getDate() - dob.getDate();

                if (
                    age < 18 ||
                    (age === 18 && (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)))
                ) {
                    errors.date = 'You must be at least 18 years old';
                }
            }
            return errors;
        }
    })
    return (
        <>
            {loading &&
                <Loading />
            }
            <form onSubmit={formik.handleSubmit}>
                <Stack
                    justifyContent={"space-between"}
                    gap={3}
                    minWidth={300}
                >

                    <Stack direction={'row'} gap={5} alignItems={'center'}>

                        {/* profile picture component */}
                        <ProfilePicture
                            formik={formik}
                            currentPicture={userProfile.profilePicture}
                            fieldName='profilePicture'
                        />

                        <Stack gap={2}>


                            {/* firstname and lastname inputs */}
                            <Stack
                                gap={2}
                                width={'100%'}
                                height={'fit-content'}
                                direction={'row'}
                            >
                                <TextField
                                    variant='filled'
                                    fullWidth
                                    label={'First Name'}
                                    value={formik.values.firstName}
                                    onChange={formik.handleChange}
                                    name='firstName'
                                    error={formik.touched && formik.errors.firstName}
                                    helperText={formik.touched && formik.errors.firstName}

                                />

                                <TextField
                                    variant='filled'
                                    fullWidth
                                    label={'Last Name'}
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange}
                                    name='lastName'
                                    error={formik.touched && formik.errors.lastName}
                                    helperText={formik.touched && formik.errors.lastName}

                                />

                            </Stack>

                            {/* email and phone inputs */}
                            <Stack
                                direction={'row'}
                                gap={2}
                            >

                                <TextField
                                    variant='filled'
                                    label={'Email'}
                                    disabled
                                    fullWidth
                                    name='email'
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                />

                                <TextField
                                    variant='filled'
                                    label={'Phone'}
                                    type='tel'
                                    fullWidth
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                    name='phone'
                                    error={formik.touched && formik.errors.phone}
                                    helperText={formik.touched && formik.errors.phone}
                                />

                            </Stack>

                        </Stack>

                    </Stack>

                    <Divider sx={{ borderColor: 'secondary.200' }} />

                    <UserAddressConstituency formik={formik} />

                    <Divider sx={{ borderColor: 'secondary.200' }} />

                    {/* cnic & dob inputs */}
                    <Stack
                        gap={1}
                    >
                        <Stack
                            direction={'row'}
                            gap={1}
                            alignItems={'center'}
                        >
                            <Typography variant='subtitle1' color={'primary.main'}>
                                Nationality Verification
                            </Typography>

                            {userProfile.profileCompletion &&
                                <Verified htmlColor='#22BB33' />
                            }
                        </Stack>

                        {userProfile.profileCompletion ?
                            <Stack
                                height={100}
                                width={500}
                            >
                                <Typography color={'primary.200'}>
                                    Your profile is completed and automatically verified. If you see any incorrect personal information, please contact the customer support.
                                </Typography>
                            </Stack>
                            :
                            <>
                                <Stack
                                    direction={'row'}
                                    gap={2}
                                >
                                    <TextField
                                        variant='filled'
                                        fullWidth
                                        name='cnic'
                                        label={'CNIC Number'}
                                        value={formik.values.cnic}
                                        onChange={formik.handleChange}
                                        error={formik.touched && formik.errors.cnic}
                                        helperText={formik.touched && formik.errors.cnic}
                                    />

                                    <TextField
                                        variant='filled'
                                        fullWidth
                                        label='Date of Birth'
                                        type="date"
                                        name="date"
                                        InputLabelProps={{ shrink: true }}
                                        value={formik.values.date}
                                        onChange={formik.handleChange}
                                        error={formik.touched.date && Boolean(formik.errors.date)}
                                        onBlur={formik.handleBlur}
                                        helperText={formik.touched.date && formik.errors.date}
                                    />
                                </Stack>

                                <NationalityVerification formik={formik} />
                            </>
                        }
                    </Stack>

                    {formik.errors.cnicFront &&
                        <Typography
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 0.5
                            }}
                            variant='body2'
                            color={"error"}>
                            <Error fontSize="small" /> {formik.errors.cnicFront}
                        </Typography>
                    }
                    {formik.errors.cnicBack &&
                        <Typography
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 0.5
                            }}
                            variant='body2'
                            color={"error"}>
                            <Error fontSize="small" /> {formik.errors.cnicBack}
                        </Typography>
                    }

                    <Divider sx={{ borderColor: 'secondary.200' }} />

                    <Grid
                        display={"flex"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        gap={1}
                    >
                        <Box
                            display={"flex"}
                            gap={0.5}
                            flexDirection={"column"}
                        >
                        </Box>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={!(formik.dirty && formik.isValid)}
                        >
                            Submit
                        </Button>
                    </Grid>
                </Stack>
            </form>
        </>
    )
}

export default withAuth(CompleteProfile);
