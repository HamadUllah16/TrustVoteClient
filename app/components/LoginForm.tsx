import { Grid, Typography, Box, Button, TextField, Stack, CircularProgress } from '@mui/material';
import React, { SetStateAction } from 'react';
import Link from 'next/link';
import { Cancel, Check, Close } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

function LoginForm({ formik, loading, children, checkExistsLoading, exists }: { children: any, formik: any, loading: boolean, checkExistsLoading: boolean, exists: boolean | null }) {
    return (
        <form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
            <Grid
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                py={4}
                width={'100%'}
            >
                <Grid
                    bgcolor={"white"}
                    display={"flex"}
                    justifyContent={"center"}
                    p={"10px"}
                    borderRadius={2}
                    gap={3}
                    boxShadow={3}
                >
                    <Grid
                        p={"50px"}
                        display={"flex"}
                        flexDirection={"column"}
                        gap={3}
                    >
                        <Box
                            display={"flex"}
                            flexDirection={"column"}
                            gap="5px"
                        >
                            <Typography variant='h3'>Welcome Back!</Typography>
                            <Typography variant='h6' color={"#5A5A5A"} fontWeight={"light"}>Login to continue</Typography>
                        </Box>

                        <Stack direction={'row'} flexGrow={1} gap={1} alignItems={'center'}>
                            <TextField
                                fullWidth
                                name='email'
                                label={'Email'}
                                placeholder='example@email.com'
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                                required
                            />
                            <Stack direction={'row'}>
                                {checkExistsLoading ? (
                                    <CircularProgress size={'24px'} />
                                ) : exists === true ? (
                                    <Check color='success' />
                                ) : exists === false ? (
                                    <Close color='error' />
                                ) : null}
                            </Stack>
                        </Stack>

                        {exists &&
                            <Stack width={'100%'} gap={1}>
                                <TextField
                                    fullWidth
                                    name='password'
                                    label={'Password'}
                                    placeholder='example123@'
                                    type='password'
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                    required
                                />
                                <Typography variant='body2' color='red'>{formik.values.error}</Typography>
                            </Stack>
                        }
                        <Button
                            fullWidth
                            disabled={!(formik.isValid && formik.dirty && !loading && exists)}
                            variant='contained'
                            type='submit'
                        >
                            {loading ?
                                <CircularProgress size={24} />
                                :
                                'Continue'
                            }
                        </Button>

                        {children}
                    </Grid>
                </Grid>
            </Grid>
        </form>
    )
}

export default LoginForm