"use client"
import React, { useEffect, useCallback, useRef } from 'react';
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

    // Redirect to dashboard if authenticated
    useEffect(() => {
        if (isAuthenticated && !loading) {
            router.push('/user/dashboard');
        }
    }, [isAuthenticated, loading, router]);

    // Fetch user profile if a token exists but not authenticated yet
    useEffect(() => {
        const token = localStorage.getItem('x_auth_token');

        if (token && !isAuthenticated && !loading) {
            dispatch(getUserProfile());
        }
    }, [isAuthenticated, loading, dispatch]);

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
            dispatch(loginUserEmailCheck({ email: formik.values.email, role: 'voter' }));
        }
        else {
            dispatch(setExists(null));
        }
    }, [dispatch, formik.errors.email, formik.values.email]);

    const timeoutRef = useRef<any>();

    useEffect(() => {
        // Clear the previous timeout if the input changes
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Set a new timeout
        timeoutRef.current = setTimeout(() => {
            checkEmailExists();
        }, 300); // 300ms delay

        // Cleanup function to clear timeout on unmount or when input changes
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [formik.values.email, checkEmailExists]);

    return (
        <LoginForm checkExistsLoading={checkExistsLoading} exists={exists} formik={formik} loading={loading}>
            <Stack>
                <hr style={{ color: "#5A5A5A" }}></hr>
                <Link href="/user/register">
                    <Typography variant='caption' color={"#5A5A5A"}>New to TrustVote? </Typography>
                    <Typography variant='caption' color={"primary.main"} sx={{ textDecoration: 'underline' }}>Register</Typography>
                </Link>
                <Link href='/candidate/login'>
                    <Typography variant='caption' color={"primary.main"} >Login as <span style={{ textDecoration: 'underline' }}> Candidate</span> instead.</Typography>
                </Link>
            </Stack>
        </LoginForm>
    );
}

export default Login;
