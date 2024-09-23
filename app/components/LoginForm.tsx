import { Grid, Typography, Box, Button, TextField, Stack, CircularProgress } from '@mui/material';
import React from 'react';
import Link from 'next/link';

function LoginForm({ formik, loading, children }: { children: any, formik: any, loading: boolean }) {
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

                        <TextField
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
                        <Button
                            fullWidth
                            disabled={!(formik.isValid && formik.dirty && !loading)}
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