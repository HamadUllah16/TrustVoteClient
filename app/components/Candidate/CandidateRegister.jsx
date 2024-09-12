'use client'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Button, Checkbox, Divider, FormControl, FormControlLabel, FormGroup, Grid, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { completeCandidateProfile, createCandidateProfile } from '../../redux/features/candidateSlice'
import { useRouter } from 'next/navigation'

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
            dispatch(createCandidateProfile({ profile: { email, password }, router: router }))
        },
    });

    return (
        <Grid
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            px={'75px'}
            py={'30px'}
        >
            <Grid
                display={"flex"}
                justifyContent={"center"}
                p={'50px'}
                gap={2}
                boxShadow={20}
                borderRadius={2}
                flexDirection={'column'}
                width={'100%'}
                maxWidth={'600px'}
            >

                <form onSubmit={formikStep1.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <Grid
                        display={'flex'}
                        flexDirection={'column'}
                    >
                        <Typography variant='h4'>Welcome To TrustVote</Typography>
                        <Typography variant='h6' fontWeight={'light'} color={'#5A5A5A'}>
                            Create a new candidate account
                        </Typography>
                    </Grid>
                    <Divider />
                    <Stack>
                        <TextField
                            fullWidth
                            label='Email'
                            name="email"
                            value={formikStep1.values.email}
                            onChange={formikStep1.handleChange}
                            onBlur={formikStep1.handleBlur}
                            error={formikStep1.touched.email && Boolean(formikStep1.errors.email)}
                        />
                        <Typography
                            variant='caption'
                            color={'error'}
                        >
                            {formikStep1.touched.email && formikStep1.errors.email}
                        </Typography>
                    </Stack>
                    <Grid
                        display={'flex'}
                        gap={2}
                        justifyContent={'space-between'}
                    >
                        <FormControl sx={{ width: '100%' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                fullWidth
                                id="outlined-adornment-password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                value={formikStep1.values.password}
                                onChange={formikStep1.handleChange}
                                onBlur={formikStep1.handleBlur}
                                helperText={formikStep1.errors.password}
                                error={formikStep1.touched.password && formikStep1.errors.password}
                                label="Password"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            <Typography
                                variant='caption'
                                color={'error'}
                            >
                                {formikStep1.touched.password && formikStep1.errors.password}
                            </Typography>
                        </FormControl>
                    </Grid>
                    <Grid
                    >
                        <FormControl sx={{ width: '100%' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-confirm-password">Confirm Password</InputLabel>
                            <OutlinedInput
                                fullWidth
                                id="outlined-adornment-confirm-password"
                                name="confirmPassword"
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={formikStep1.values.confirmPassword}
                                onChange={formikStep1.handleChange}
                                onBlur={formikStep1.handleBlur}
                                error={formikStep1.touched.confirmPassword && Boolean(formikStep1.errors.confirmPassword)} // Corrected here
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Confirm Password"
                            />
                            <Typography
                                variant='caption'
                                color={'error'}
                            >
                                {formikStep1.touched.confirmPassword && formikStep1.errors.confirmPassword}
                            </Typography>
                        </FormControl>

                    </Grid>
                    <Grid display="flex" justifyContent="space-between">
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onClick={() => setTermsChecked(!termsChecked)}
                                    />
                                }
                                label='You agree to our terms and conditions'
                            />
                        </FormGroup>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={!(termsChecked && formikStep1.isValid && formikStep1.dirty)}
                        >
                            Create account
                        </Button>
                    </Grid>
                </form>
            </Grid>
        </Grid>
    )
}

export default CandidateRegister
