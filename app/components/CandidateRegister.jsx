'use client'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Button, Checkbox, Divider, FormControl, FormControlLabel, Grid, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, TextField, Typography } from '@mui/material'
import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

function CandidateRegister() {
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const [step, setStep] = React.useState(1);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleNext = () => {
        if (step === 1 && formikStep1.isValid) {
            setStep(step + 1);
        } else if (step === 2 && formikStep2.isValid) {
            setStep(step + 1);
        }
    };

    const validationSchemaStep1 = Yup.object({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        phone: Yup.string().required('Phone number is required'),
        password: Yup.string()
            .min(8, 'Password should be of minimum 8 characters length')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Confirm Password is required'),
    });

    const validationSchemaStep2 = Yup.object({
        cnicNumber: Yup.string().required('CNIC Number is required'),
        dateOfBirth: Yup.date().required('Date of Birth is required'),
        gender: Yup.string().required('Gender is required'),
        constituencyType: Yup.string().required('Constituency Type is required'),
        constituency: Yup.string().required('Constituency Name/Number is required'),
        partyAffiliation: Yup.string().required('Party Affiliation is required'),
        manifesto: Yup.mixed().required('Manifesto is required'),
    });

    const validationSchemaStep3 = Yup.object({
        cnicFront: Yup.mixed().required('CNIC Front Image is required'),
        cnicBack: Yup.mixed().required('CNIC Back Image is required'),
        educationalCertificates: Yup.mixed().required('Educational Certificates are required'),
        assetDeclaration: Yup.mixed().required('Asset Declaration is required'),
        codeOfConduct: Yup.boolean()
            .oneOf([true], 'You must agree to the code of conduct')
            .required('Agreement is required'),
    });

    const formikStep1 = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: validationSchemaStep1,
        onSubmit: (values) => {
            handleNext();
        },
    });

    const formikStep2 = useFormik({
        initialValues: {
            cnicNumber: '',
            dateOfBirth: '',
            gender: '',
            constituencyType: '',
            constituency: '',
            partyAffiliation: '',
            manifesto: null,
        },
        validationSchema: validationSchemaStep2,
        onSubmit: (values) => {
            handleNext();
        },
    });

    const formikStep3 = useFormik({
        initialValues: {
            cnicFront: null,
            cnicBack: null,
            educationalCertificates: null,
            assetDeclaration: null,
            codeOfConduct: false,
        },
        validationSchema: validationSchemaStep3,
        onSubmit: (values) => {
            // Submit the final form
            console.log('Form Submitted', values);
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
                {step === 1 && (
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

                        <Grid
                            display={'flex'}
                            gap={2}
                        >
                            <TextField
                                fullWidth
                                label='First Name'
                                name="firstName"
                                value={formikStep1.values.firstName}
                                onChange={formikStep1.handleChange}
                                error={formikStep1.touched.firstName && Boolean(formikStep1.errors.firstName)}
                                helperText={formikStep1.touched.firstName && formikStep1.errors.firstName}
                            />
                            <TextField
                                fullWidth
                                label='Last Name'
                                name="lastName"
                                value={formikStep1.values.lastName}
                                onChange={formikStep1.handleChange}
                                error={formikStep1.touched.lastName && Boolean(formikStep1.errors.lastName)}
                                helperText={formikStep1.touched.lastName && formikStep1.errors.lastName}
                            />
                        </Grid>
                        <Grid
                            display={'flex'}
                            gap={2}
                        >
                            <TextField
                                fullWidth
                                label='Email'
                                name="email"
                                value={formikStep1.values.email}
                                onChange={formikStep1.handleChange}
                                error={formikStep1.touched.email && Boolean(formikStep1.errors.email)}
                                helperText={formikStep1.touched.email && formikStep1.errors.email}
                            />
                            <TextField
                                fullWidth
                                type='tel'
                                label='Phone'
                                name="phone"
                                value={formikStep1.values.phone}
                                onChange={formikStep1.handleChange}
                                error={formikStep1.touched.phone && Boolean(formikStep1.errors.phone)}
                                helperText={formikStep1.touched.phone && formikStep1.errors.phone}
                            />
                        </Grid>
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
                                    error={formikStep1.touched.password && Boolean(formikStep1.errors.password)}
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
                                    label="Password"
                                />
                            </FormControl>
                        </Grid>
                        <Grid
                        >
                            <FormControl sx={{ width: '100%' }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                                <OutlinedInput
                                    fullWidth
                                    id="outlined-adornment-password"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={formikStep1.values.confirmPassword}
                                    onChange={formikStep1.handleChange}
                                    error={formikStep1.touched.confirmPassword && Boolean(formikStep1.errors.confirmPassword)}
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
                            </FormControl>
                        </Grid>
                        <Grid display="flex" justifyContent="flex-end">
                            <Button type="submit" variant="contained">
                                Next
                            </Button>
                        </Grid>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={formikStep2.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <Typography variant='h4' gutterBottom>
                            Additional Candidate Information
                        </Typography>
                        <Divider />
                        <Grid
                            display={'flex'}
                            gap={2}
                        >
                            <TextField
                                fullWidth
                                label='CNIC Number'
                                name="cnicNumber"
                                value={formikStep2.values.cnicNumber}
                                onChange={formikStep2.handleChange}
                                error={formikStep2.touched.cnicNumber && Boolean(formikStep2.errors.cnicNumber)}
                                helperText={formikStep2.touched.cnicNumber && formikStep2.errors.cnicNumber}
                            />
                            <TextField
                                fullWidth
                                label='Date of Birth'
                                type="date"
                                name="dateOfBirth"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={formikStep2.values.dateOfBirth}
                                onChange={formikStep2.handleChange}
                                error={formikStep2.touched.dateOfBirth && Boolean(formikStep2.errors.dateOfBirth)}
                                helperText={formikStep2.touched.dateOfBirth && formikStep2.errors.dateOfBirth}
                            />
                        </Grid>
                        <Grid
                            display={'flex'}
                            gap={2}
                        >
                            <TextField
                                fullWidth
                                select
                                label='Gender'
                                name="gender"
                                value={formikStep2.values.gender}
                                onChange={formikStep2.handleChange}
                                error={formikStep2.touched.gender && Boolean(formikStep2.errors.gender)}
                                helperText={formikStep2.touched.gender && formikStep2.errors.gender}
                            >
                                <MenuItem value="male">Male</MenuItem>
                                <MenuItem value="female">Female</MenuItem>
                                <MenuItem value="other">Other</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid
                            display={'flex'}
                            gap={2}
                        >
                            <TextField
                                fullWidth
                                select
                                label='Constituency Type'
                                name="constituencyType"
                                value={formikStep2.values.constituencyType}
                                onChange={formikStep2.handleChange}
                                error={formikStep2.touched.constituencyType && Boolean(formikStep2.errors.constituencyType)}
                                helperText={formikStep2.touched.constituencyType && formikStep2.errors.constituencyType}
                            >
                                <MenuItem value="national">National Assembly</MenuItem>
                                <MenuItem value="provincial">Provincial Assembly</MenuItem>
                            </TextField>
                            <TextField
                                fullWidth
                                label='Constituency Name/Number'
                                name="constituency"
                                value={formikStep2.values.constituency}
                                onChange={formikStep2.handleChange}
                                error={formikStep2.touched.constituency && Boolean(formikStep2.errors.constituency)}
                                helperText={formikStep2.touched.constituency && formikStep2.errors.constituency}
                            />
                        </Grid>
                        <Grid
                            display={'flex'}
                            gap={2}
                        >
                            <TextField
                                fullWidth
                                select
                                label='Party Affiliation'
                                name="partyAffiliation"
                                value={formikStep2.values.partyAffiliation}
                                onChange={formikStep2.handleChange}
                                error={formikStep2.touched.partyAffiliation && Boolean(formikStep2.errors.partyAffiliation)}
                                helperText={formikStep2.touched.partyAffiliation && formikStep2.errors.partyAffiliation}
                            >
                                <MenuItem value="independent">Independent</MenuItem>
                                <MenuItem value="partyA">Party A</MenuItem>
                                <MenuItem value="partyB">Party B</MenuItem>
                                {/* Add more parties as necessary */}
                            </TextField>
                            <TextField
                                fullWidth
                                label='Party Symbol'
                                name="partySymbol"
                                value={formikStep2.values.partySymbol}
                                onChange={formikStep2.handleChange}
                            />
                        </Grid>
                        <TextField
                            fullWidth
                            label='Manifesto Upload'
                            type="file"
                            name="manifesto"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(event) => formikStep2.setFieldValue("manifesto", event.currentTarget?.files[0])}
                            error={formikStep2.touched.manifesto && Boolean(formikStep2.errors.manifesto)}
                            helperText={formikStep2.touched.manifesto && formikStep2.errors.manifesto}
                        />
                        <Grid display="flex" justifyContent="space-between" gap={2}>
                            <Button onClick={() => setStep(step - 1)} variant="contained" color="primary">
                                Back
                            </Button>
                            <Button type="submit" variant="contained" color="primary">
                                Next
                            </Button>
                        </Grid>
                    </form>
                )}

                {step === 3 && (
                    <form onSubmit={formikStep3.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <Typography variant='h4' gutterBottom>
                            Legal and Compliance
                        </Typography>
                        <Divider />
                        <Grid
                            display={'flex'}
                            gap={2}
                        >
                            <TextField
                                fullWidth
                                label='CNIC Front Image'
                                type="file"
                                name="cnicFront"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(event) => formikStep3.setFieldValue("cnicFront", event.currentTarget.files[0])}
                                error={formikStep3.touched.cnicFront && Boolean(formikStep3.errors.cnicFront)}
                                helperText={formikStep3.touched.cnicFront && formikStep3.errors.cnicFront}
                            />
                            <TextField
                                fullWidth
                                label='CNIC Back Image'
                                type="file"
                                name="cnicBack"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(event) => formikStep3.setFieldValue("cnicBack", event.currentTarget.files[0])}
                                error={formikStep3.touched.cnicBack && Boolean(formikStep3.errors.cnicBack)}
                                helperText={formikStep3.touched.cnicBack && formikStep3.errors.cnicBack}
                            />
                        </Grid>
                        <TextField
                            fullWidth
                            label='Educational Certificates (highest/recent degree)'
                            type="file"
                            name="educationalCertificates"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(event) => formikStep3.setFieldValue("educationalCertificates", event.currentTarget.files[0])}
                            error={formikStep3.touched.educationalCertificates && Boolean(formikStep3.errors.educationalCertificates)}
                            helperText={formikStep3.touched.educationalCertificates && formikStep3.errors.educationalCertificates}
                        />
                        <Grid
                            display={'flex'}
                            gap={2}
                            alignItems="center"
                        >
                            <TextField
                                fullWidth
                                label='Asset Declaration'
                                type="file"
                                name="assetDeclaration"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(event) => formikStep3.setFieldValue("assetDeclaration", event.currentTarget.files[0])}
                                error={formikStep3.touched.assetDeclaration && Boolean(formikStep3.errors.assetDeclaration)}
                                helperText={formikStep3.touched.assetDeclaration && formikStep3.errors.assetDeclaration}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="codeOfConduct"
                                        checked={formikStep3.values.codeOfConduct}
                                        onChange={formikStep3.handleChange}
                                    />
                                }
                                label="I agree to the code of conduct"
                                error={formikStep3.touched.codeOfConduct && Boolean(formikStep3.errors.codeOfConduct)}
                                helperText={formikStep3.touched.codeOfConduct && formikStep3.errors.codeOfConduct}
                            />
                        </Grid>
                        <Grid display="flex" justifyContent="space-between" gap={2}>
                            <Button onClick={() => setStep(step - 1)} variant="contained" color="primary">
                                Back
                            </Button>
                            <Button type="submit" variant="contained" color="primary">
                                Submit
                            </Button>
                        </Grid>
                    </form>
                )}
            </Grid>
        </Grid>
    )
}

export default CandidateRegister
