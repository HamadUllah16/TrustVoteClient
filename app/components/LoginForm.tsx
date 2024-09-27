import { Grid, Typography, Box, Button, TextField, Stack, CircularProgress, InputLabel, OutlinedInput, InputAdornment, IconButton, FormControl } from '@mui/material';
import React from 'react';
import { Check, Close } from '@mui/icons-material';
import Image from 'next/image';

function LoginForm({ formik, loading, children, checkExistsLoading, exists }: { children: any, formik: any, loading: boolean, checkExistsLoading: boolean, exists: boolean | null }) {
    return (
        <Grid
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            py={4}
            width={'100vw'}
            height={'100vh'}
        >
            <Grid
                bgcolor={"secondary.main"}
                border={'1px solid'}
                borderColor={'secondary.200'}
                display={"flex"}
                justifyContent={"center"}
                p={"10px"}
                borderRadius={2}
                gap={3}
            >
                <Grid
                    p={"50px"}
                    display={"flex"}
                    flexDirection={"column"}
                    gap={3}
                >
                    <Stack direction={'row'} gap={3}>
                        <Image
                            src={'/logo-dark.jpg'}
                            width={100}
                            height={100}
                            alt='logo'
                            style={{
                                borderRadius: '16px',
                                rotate: '90deg'
                            }}
                        />
                        <Box
                            display={"flex"}
                            flexDirection={"column"}
                            justifyContent={'center'}
                        >
                            <Typography variant='h4' color={'primary.main'} textAlign={'center'}>Welcome to Trust Vote</Typography>
                            <Typography variant='h6' color={"#5A5A5A"} fontWeight={"light"}>Login to continue</Typography>
                        </Box>
                    </Stack>
                    <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <Stack direction={'row'} flexGrow={1} gap={1} alignItems={'center'}>

                            <FormControl sx={{ width: '100%' }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-email" error={formik.touched.email && Boolean(formik.errors.email)}>Email</InputLabel>
                                <OutlinedInput
                                    fullWidth
                                    id="outlined-adornment-email"
                                    name="email"
                                    type={'email'}
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    label="Email"
                                    endAdornment={
                                        <InputAdornment position="end">
                                            {checkExistsLoading ?
                                                <CircularProgress />
                                                :
                                                exists ?
                                                    <Check color='success' />
                                                    :
                                                    <Close color='error' />
                                            }
                                        </InputAdornment>
                                    }
                                />
                                <Typography
                                    variant='caption'
                                    color={'error'}
                                >
                                    {formik.touched.email && formik.errors.email}
                                </Typography>
                            </FormControl>
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
                    </form>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default LoginForm