"use client"
import { Grid, Typography, Box, Button, TextField, Stack } from '@mui/material';
import React, { useEffect } from 'react';
import { East } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { FormikValues, useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AppDispatch, RootState } from '@/app/redux/store';
import { loginAdmin } from '@/app/redux/features/adminSlice';
import LoginForm from '../LoginForm';

function Login() {
    const { loading, error } = useSelector((state: RootState) => state.admin);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            error: error ?? ''
        },
        enableReinitialize: true,
        onSubmit: values => {
            const { email, password } = values;
            dispatch(loginAdmin({ credentials: values, router }));
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
            {null}
        </LoginForm>
    );
}

export default Login;
