import React, { useState } from 'react'
import { East, Error, Visibility, VisibilityOff, Warning, WarningRounded } from '@mui/icons-material'
import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField, Typography } from '@mui/material'

function RegisterForm({ formik }: { formik: any }) {
    const [agree, setAgree] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: any) => {
        event.preventDefault();
    };

    return (
        <form style={{ display: 'flex', flexDirection: 'column', gap: '16px', flexGrow: 1 }} onSubmit={formik.handleSubmit}>
            <Stack>
                <TextField
                    fullWidth
                    label='Email'
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                />
                <Typography
                    variant='caption'
                    color={'error'}
                >
                    {formik.touched.email && formik.errors.email}
                </Typography>
            </Stack>
            <Box
                display={'flex'}
                flexDirection={'column'}
                gap={0.5}
            >
                <FormControl sx={{ width: '100%' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password" error={formik.touched.password && Boolean(formik.errors.password)}>Password</InputLabel>
                    <OutlinedInput
                        fullWidth
                        id="outlined-adornment-password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && Boolean(formik.errors.password)}
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
                        {formik.touched.password && formik.errors.password}
                    </Typography>
                </FormControl>
            </Box>
            <Box
                display={'flex'}
                flexDirection={'column'}
                gap={0.5}
            >
                <FormControl sx={{ width: '100%' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-confirm-password" error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}>Confirm Password</InputLabel>
                    <OutlinedInput
                        fullWidth
                        id="outlined-adornment-confirm-password"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
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
                        {formik.touched.confirmPassword && formik.errors.confirmPassword}
                    </Typography>
                </FormControl>
            </Box>

            <FormControlLabel
                control={<Checkbox checked={agree} onChange={() => setAgree(!agree)} />}
                label={
                    <Typography variant="caption" color={'primary.100'}>
                        I agree to TrustVote&apos;s terms and conditions.
                    </Typography>
                }
            />

            <Button
                type='submit'
                disabled={!(formik.isValid && formik.dirty && agree)}
                variant='contained'
            >
                Create Account
            </Button>
        </form>
    )
}

export default RegisterForm