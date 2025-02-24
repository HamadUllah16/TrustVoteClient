"use client"
import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormikValues, useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { AppDispatch, RootState } from '@/app/redux/store';
import { getAdminProfile, loginAdmin } from '@/app/redux/features/adminSlice';
import LoginForm from '../LoginForm';
import toast from 'react-hot-toast';
import { loginUserEmailCheck, setExists } from '@/app/redux/features/authSlice';

function Login() {
    const { loading, checkExistsLoading, isAuthenticated, exists } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    // Redirect to dashboard if authenticated
    useEffect(() => {
        if (isAuthenticated && !loading) {
            router.push('/admin/dashboard');
        }
    }, [isAuthenticated, loading, router]);

    useEffect(() => {
        const token = localStorage.getItem('x_auth_token');

        if (token && !isAuthenticated && !loading) {
            dispatch(getAdminProfile());
        }
    }, [isAuthenticated, loading, dispatch]);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        enableReinitialize: true,
        onSubmit: values => {
            toast.promise(
                dispatch(loginAdmin({ credentials: values, router })).unwrap(), {
                loading: 'Logging in...',
                success: 'Authenticated',
                error: err => err.message || 'Authentication error'
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


    // Callback to dispatch email check
    const checkEmailExists = useCallback(() => {
        if (!formik.errors.email && formik.values.email) {
            dispatch(loginUserEmailCheck({ email: formik.values.email, role: 'admin' }));
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
            {null}
        </LoginForm>
    );
}

export default Login;
