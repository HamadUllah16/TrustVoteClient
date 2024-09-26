"use client"
import { Grid, Typography, Box, Button, TextField, Stack } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormikValues, useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AppDispatch, RootState } from '@/app/redux/store';
import { loginCandidate } from '@/app/redux/features/authSlice';
import LoginForm from '../LoginForm';
import toast from 'react-hot-toast';

function CandidateLogin() {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { isAuthenticated, loading } = useSelector((state: RootState) => state.auth)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: values => {
            toast.promise(
                dispatch(loginCandidate(values)).unwrap(), {
                loading: 'Loading...',
                success: 'Authenticated',
                error: err => err.message || 'Authentication Error'
            }
            )
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
        <LoginForm formik={formik} loading={loading}>
            <Stack>
                <hr style={{ color: "#5A5A5A" }}></hr>
                <Link
                    href={"/candidate/register"}>
                    <Typography variant='caption' color={"#5A5A5A"}>New to TrustVote? </Typography>
                    <Typography variant='caption' color={"secondary.main"} sx={{ textDecoration: 'underline' }}>Register</Typography>
                </Link>
                <Link href='/user/login'>
                    <Typography variant='caption' color={"secondary.main"} >Login as <span style={{ textDecoration: 'underline' }}>Voter</span> instead.</Typography>
                </Link>
            </Stack>
        </LoginForm>
    );
}

export default CandidateLogin;
