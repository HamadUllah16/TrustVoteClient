import React, { useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Box, Button, Checkbox, FormControl, FormControlLabel, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from '@mui/material'

function RegisterForm({ formik }: { formik: any }) {
    const [agree, setAgree] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <form style={{ display: 'flex', flexDirection: 'column', gap: '16px', flexGrow: 1 }} onSubmit={formik.handleSubmit}>
            <FormControl sx={{ width: '100%' }} variant="outlined">
                <InputLabel sx={{ color: 'secondary.100' }} htmlFor="outlined-adornment-email" error={formik.touched.email && Boolean(formik.errors.email)}>Email</InputLabel>
                <OutlinedInput
                    sx={{
                        color: 'secondary.100',
                        bgcolor: 'background.default',
                    }}
                    fullWidth
                    id="outlined-adornment-email"
                    name="email"
                    type={'email'}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    label="Email"
                />
                <Typography
                    variant='caption'
                    color={'error'}
                >
                    {formik.touched.email && formik.errors.email}
                </Typography>
            </FormControl>
            <Box
                display={'flex'}
                flexDirection={'column'}
                gap={0.5}
            >
                <FormControl sx={{ width: '100%' }} variant="outlined">
                    <InputLabel sx={{ color: 'secondary.100' }} htmlFor="outlined-adornment-password" error={formik.touched.password && Boolean(formik.errors.password)}>Password</InputLabel>
                    <OutlinedInput
                        sx={{
                            color: 'secondary.100',
                            bgcolor: 'background.default'
                        }}
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
                                <IconButton onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ?
                                        <VisibilityOff sx={{ color: "secondary.100" }} fontSize='medium' />
                                        :
                                        <Visibility sx={{ color: 'secondary.100' }} fontSize='medium' />
                                    }
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
                    <InputLabel sx={{ color: 'secondary.100' }} htmlFor="outlined-adornment-confirmPassword" error={formik.touched.password && Boolean(formik.errors.password)}>Confirm Password</InputLabel>
                    <OutlinedInput
                        sx={{
                            color: 'secondary.100',
                            bgcolor: 'background.default'
                        }}
                        fullWidth
                        id="outlined-adornment-confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                        label="Confirm Password"
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                    {showConfirmPassword ?
                                        <VisibilityOff sx={{ color: "secondary.100" }} fontSize='medium' />
                                        :
                                        <Visibility sx={{ color: 'secondary.100' }} fontSize='medium' />
                                    }
                                </IconButton>
                            </InputAdornment>
                        }
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
                sx={{ ":disabled": { backgroundColor: '#2B2B2D' } }}
            >
                Create Account
            </Button>
        </form>
    )
}

export default RegisterForm