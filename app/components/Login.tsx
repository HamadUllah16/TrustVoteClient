"use client"
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/features/authSlice';
import { FormikValues, useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { AppDispatch, RootState } from '../redux/store';
import { getUserProfile } from '../redux/features/userSlice';
import LoginForm from './LoginForm';
import { Stack, Typography } from '@mui/material';
import Link from 'next/link';

function Login() {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { loading, isAuthenticated } = useSelector((state: RootState) => state.auth)

    useEffect(() => {
        if (isAuthenticated && !loading) {
            router.push('/home')
        }
    }, [loading, isAuthenticated])

    useEffect(() => {
        const token = localStorage.getItem('x_auth_token');
        if (token && !isAuthenticated) {
            dispatch(getUserProfile());
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

    return (
        <LoginForm formik={formik} loading={loading}>
            <Stack>
                <hr style={{ color: "#5A5A5A" }}></hr>
                <Link
                    href={"/user/register"}>
                    <Typography variant='caption' color={"#5A5A5A"}>New to TrustVote? </Typography>
                    <Typography variant='caption' color={"secondary.main"} sx={{ textDecoration: 'underline' }}>Register</Typography>
                </Link>
                <Link href='/user/login'>
                    <Typography variant='caption' color={"secondary.main"} >Login as Voter</Typography>
                </Link>
            </Stack>
        </LoginForm>
    );
}

export default Login;
