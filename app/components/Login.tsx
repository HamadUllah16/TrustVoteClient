"use client"
import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, loginUserEmailCheck, setExists } from '../redux/features/authSlice';
import { FormikValues, useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { AppDispatch, RootState } from '../redux/store';
import { getUserProfile } from '../redux/features/userSlice';
import LoginForm from './LoginForm';
import { CircularProgress, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Cancel, CancelOutlined, Check } from '@mui/icons-material';

function Login() {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { loading, isAuthenticated, exists, checkExistsLoading } = useSelector((state: RootState) => state.auth);

    // Navigate to home if authenticated
    useEffect(() => {
        if (isAuthenticated && !loading) {
            router.push('/home');
        }
    }, [loading, isAuthenticated, router]);

    // Fetch user profile if token is present
    useEffect(() => {
        const token = localStorage.getItem('x_auth_token');
        if (token && !isAuthenticated) {
            dispatch(getUserProfile());
        }
    }, [isAuthenticated, dispatch]);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: values => {
            toast.promise(
                dispatch(loginUser(values)).unwrap(), {
                loading: 'Loading...',
                success: 'Authenticated',
                error: err => err.message || 'Authentication error'
            });
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

    // Callback to dispatch email check
    const checkEmailExists = useCallback(() => {
        if (!formik.errors.email && formik.values.email) {
            dispatch(loginUserEmailCheck(formik.values.email));
        }
        else {
            dispatch(setExists(null));
        }
    }, [dispatch, formik.errors.email, formik.values.email]);

    useEffect(() => {
        checkEmailExists();
    }, [formik.values.email, checkEmailExists]);

    return (
        <LoginForm checkExistsLoading={checkExistsLoading} exists={exists} formik={formik} loading={loading}>
            <Stack>
                <hr style={{ color: "#5A5A5A" }}></hr>
                <Link href="/user/register">
                    <Typography variant='caption' color={"#5A5A5A"}>New to TrustVote? </Typography>
                    <Typography variant='caption' color={"secondary.main"} sx={{ textDecoration: 'underline' }}>Register</Typography>
                </Link>
                <Link href='/candidate/login'>
                    <Typography variant='caption' color={"secondary.main"} >Login as <span style={{ textDecoration: 'underline' }}> Candidate</span> instead.</Typography>
                </Link>
            </Stack>
        </LoginForm>
    );
}

export default Login;
