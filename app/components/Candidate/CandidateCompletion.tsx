'use client'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { updateCandidateProfile } from '../../redux/features/candidateSlice'
import { AppDispatch, RootState } from '@/app/redux/store'
import withCandidateAuth from '@/app/utils/withCandidateAuth'
import { Button, Checkbox, CircularProgress, Divider, FormControlLabel, Grid, MenuItem, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { allPoliticalParties } from '@/app/redux/features/profileCompletionSlice'

function CandidateCompletion() {
    const [step, setStep] = useState(1)
    const dispatch = useDispatch<AppDispatch>();
    const { loading } = useSelector((state: RootState) => state.candidate)
    const { allParties } = useSelector((state: RootState) => state.profileCompletion)
    const { profileCompletion, email, firstName, lastName, phone } = useSelector((state: RootState) => state.user.userProfile)
    const router = useRouter()

    const [allValues, setAllValues] = useState({
        firstName: firstName ?? '',
        lastName: lastName ?? '',
        phone: phone ?? '',
        dateOfBirth: '',
        gender: '',
        cnicNumber: '',
        constituencyType: '',
        constituency: '',
        partyAffiliation: '',
        manifesto: null,
        cnicFront: null,
        cnicBack: null,
        educationalCertificates: null,
        assetDeclaration: null,
        codeOfConduct: false,
    });

    useEffect(() => {
        if (profileCompletion) {
            router.push('/candidate')
        }
        dispatch(allPoliticalParties());
    }, [profileCompletion])

    const handleNext = async (formik: any) => {
        const isValid = await formik.validateForm();

        if (!Object.keys(isValid).length) {
            setAllValues((prevValues) => ({
                ...prevValues,
                ...formik.values,
            }));
            setStep(step + 1);
        }
    };

    // Validation schemas
    const validationSchemaStep1 = Yup.object({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        phone: Yup.string()
            .required('Phone Number is required')
            .matches(/^(?:\+92|0)?(3[0-9]{2})[0-9]{7}$/, 'Phone number is not valid'),
        dateOfBirth: Yup.date()
            .required('Date of Birth is required')
            .test('age', 'You must be at least 18 years old', function (value) {
                if (!value) return false; // No value, return false
                const today = new Date();
                const birthDate = new Date(value);
                const age = today.getFullYear() - birthDate.getFullYear();
                const monthDifference = today.getMonth() - birthDate.getMonth();

                // Check if the user is at least 18 years old
                return age > 18 || (age === 18 && monthDifference > 0) ||
                    (age === 18 && monthDifference === 0 && today.getDate() >= birthDate.getDate());
            }),
        gender: Yup.string().required('Gender is required'),
    });

    const validationSchemaStep2 = Yup.object({
        cnicNumber: Yup.string().required('CNIC Number is required'),
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

    // Formik steps
    const formikStep1 = useFormik({
        initialValues: {
            firstName: allValues.firstName,
            lastName: allValues.lastName,
            phone: allValues.phone,
            dateOfBirth: allValues.dateOfBirth,
            gender: allValues.gender,
        },
        enableReinitialize: true,
        validationSchema: validationSchemaStep1,
        onSubmit: (values) => {
            handleNext(formikStep1);
        },
    });

    const formikStep2 = useFormik({
        initialValues: {
            cnicNumber: allValues.cnicNumber,
            constituencyType: allValues.constituencyType,
            constituency: allValues.constituency,
            partyAffiliation: allValues.partyAffiliation,
            manifesto: allValues.manifesto,
        },
        validationSchema: validationSchemaStep2,
        onSubmit: (values) => {
            handleNext(formikStep2);
        },
    });

    const formikStep3 = useFormik({
        initialValues: {
            cnicFront: allValues.cnicFront,
            cnicBack: allValues.cnicBack,
            educationalCertificates: allValues.educationalCertificates,
            assetDeclaration: allValues.assetDeclaration,
            codeOfConduct: allValues.codeOfConduct,
        },
        validationSchema: validationSchemaStep3,
        onSubmit: (values) => {
            setAllValues((prevValues) => ({
                ...prevValues,
                ...values,
            }));
            const token = localStorage.getItem('x_auth_token')
            dispatch(updateCandidateProfile({ profile: { ...allValues, ...values }, router, token }));

            console.log('Final Form Data:', allValues);
        },
    });

    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>, fieldName: string, setFieldValue: any) => {
        const file = event.currentTarget.files?.[0];
        if (file) {
            try {
                // const base64File = await fileToBase64(file);
                setFieldValue(fieldName, file);
            } catch (error) {
                console.error("Error converting file to base64: ", error);
            }
        }
    };

    return (
        <>
            {step === 1 && (
                <form onSubmit={formikStep1.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <Typography variant='h4' color={'primary.main'}>
                        Personal Details
                    </Typography>
                    <Divider />
                    <Grid display={'flex'} gap={2}>

                        <TextField
                            fullWidth
                            label='First Name'
                            name="firstName"
                            value={formikStep1.values.firstName}
                            onChange={formikStep1.handleChange}
                            error={formikStep1.touched.firstName && Boolean(formikStep1.errors.firstName)}
                            onBlur={formikStep1.handleBlur}
                            helperText={formikStep1.touched.firstName && formikStep1.errors.firstName}
                        />
                        <TextField
                            fullWidth
                            label='Last Name'
                            name="lastName"
                            value={formikStep1.values.lastName}
                            onChange={formikStep1.handleChange}
                            error={formikStep1.touched.lastName && Boolean(formikStep1.errors.lastName)}
                            onBlur={formikStep1.handleBlur}
                            helperText={formikStep1.touched.lastName && formikStep1.errors.lastName}
                        />
                    </Grid>
                    <Grid display={'flex'} gap={2}>
                        <TextField
                            fullWidth
                            label='Phone Number'
                            name="phone"
                            value={formikStep1.values.phone}
                            onChange={formikStep1.handleChange}
                            error={formikStep1.touched.phone && Boolean(formikStep1.errors.phone)}
                            onBlur={formikStep1.handleBlur}
                            helperText={formikStep1.touched.phone && formikStep1.errors.phone}
                        />
                    </Grid>
                    <Grid display={'flex'} gap={2}>
                        <TextField
                            fullWidth
                            label='Date of Birth'
                            type="date"
                            name="dateOfBirth"
                            InputLabelProps={{ shrink: true }}
                            value={formikStep1.values.dateOfBirth}
                            onChange={formikStep1.handleChange}
                            error={formikStep1.touched.dateOfBirth && Boolean(formikStep1.errors.dateOfBirth)}
                            onBlur={formikStep1.handleBlur}
                            helperText={formikStep1.touched.dateOfBirth && formikStep1.errors.dateOfBirth}
                        />
                        <TextField
                            fullWidth
                            select
                            label='Gender'
                            name="gender"
                            value={formikStep1.values.gender}
                            onChange={formikStep1.handleChange}
                            error={formikStep1.touched.gender && Boolean(formikStep1.errors.gender)}
                            onBlur={formikStep1.handleBlur}
                            helperText={formikStep1.touched.gender && formikStep1.errors.gender}
                        >
                            <MenuItem value="male">Male</MenuItem>
                            <MenuItem value="female">Female</MenuItem>
                            <MenuItem value="other">Other</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid display="flex" justifyContent="end" gap={2}>
                        <Button disabled={!(formikStep1.isValid && formikStep1.dirty)} type="submit" variant="contained" color="primary">
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
                    <Grid display={'flex'} gap={2}>
                        <TextField
                            fullWidth
                            label='CNIC Number'
                            placeholder='17301-1234567-8'
                            name="cnicNumber"
                            value={formikStep2.values.cnicNumber}
                            onChange={formikStep2.handleChange}
                            error={formikStep2.touched.cnicNumber && Boolean(formikStep2.errors.cnicNumber)}
                            helperText={formikStep2.touched.cnicNumber && formikStep2.errors.cnicNumber}
                        />
                    </Grid>
                    <Grid display={'flex'} gap={2}>
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
                            <MenuItem value="national assembly">National Assembly</MenuItem>
                            <MenuItem value="provincial assembly">Provincial Assembly</MenuItem>
                        </TextField>
                        <TextField
                            fullWidth
                            label='Constituency Name/Number'
                            placeholder='NA-7'
                            name="constituency"
                            value={formikStep2.values.constituency}
                            onChange={formikStep2.handleChange}
                            error={formikStep2.touched.constituency && Boolean(formikStep2.errors.constituency)}
                            helperText={formikStep2.touched.constituency && formikStep2.errors.constituency}
                        />
                    </Grid>
                    <Grid display={'flex'} gap={2}>
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
                            {allParties && allParties.map((party: any, index: number) => {
                                return (
                                    <MenuItem key={index} value={party.name}>{party.name}</MenuItem>
                                )
                            })}
                        </TextField>
                    </Grid>
                    <TextField
                        fullWidth
                        label='Manifesto Upload (PDF)'
                        type="file"
                        name="manifesto"
                        InputLabelProps={{ shrink: true }}
                        onChange={(event: any) => formikStep2.setFieldValue('manifesto', event.currentTarget.files?.[0])}
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
                    <Typography variant='h4' color={'primary.main'}>
                        Legal and Compliance
                    </Typography>
                    <Divider />
                    <Grid display={'flex'} gap={2}>
                        <TextField
                            fullWidth
                            label='CNIC Front Image'
                            type="file"
                            name="cnicFront"
                            InputLabelProps={{ shrink: true }}
                            onChange={(event: any) => handleFileChange(event, "cnicFront", formikStep3.setFieldValue)}
                            error={formikStep3.touched.cnicFront && Boolean(formikStep3.errors.cnicFront)}
                            helperText={formikStep3.touched.cnicFront && formikStep3.errors.cnicFront}
                        />
                        <TextField
                            fullWidth
                            label='CNIC Back Image'
                            type="file"
                            name="cnicBack"
                            InputLabelProps={{ shrink: true }}
                            onChange={(event: any) => handleFileChange(event, "cnicBack", formikStep3.setFieldValue)}
                            error={formikStep3.touched.cnicBack && Boolean(formikStep3.errors.cnicBack)}
                            helperText={formikStep3.touched.cnicBack && formikStep3.errors.cnicBack}
                        />
                    </Grid>
                    <TextField
                        fullWidth
                        label='Educational Certificates (highest/recent degree)'
                        type="file"
                        name="educationalCertificates"
                        InputLabelProps={{ shrink: true }}
                        onChange={(event: any) => handleFileChange(event, "educationalCertificates", formikStep3.setFieldValue)}
                        error={formikStep3.touched.educationalCertificates && Boolean(formikStep3.errors.educationalCertificates)}
                        helperText={formikStep3.touched.educationalCertificates && formikStep3.errors.educationalCertificates}
                    />
                    <Grid display={'flex'} gap={2} alignItems="center">
                        <TextField
                            fullWidth
                            label='Asset Declaration'
                            type="file"
                            name="assetDeclaration"
                            InputLabelProps={{ shrink: true }}
                            onChange={(event: any) => handleFileChange(event, "assetDeclaration", formikStep3.setFieldValue)}
                            error={formikStep3.touched.assetDeclaration && Boolean(formikStep3.errors.assetDeclaration)}
                            helperText={formikStep3.touched.assetDeclaration && formikStep3.errors.assetDeclaration}
                        />
                        <FormControlLabel
                            color='primary.200'
                            control={
                                <Checkbox
                                    name="codeOfConduct"
                                    checked={formikStep3.values.codeOfConduct}
                                    onChange={formikStep3.handleChange}
                                />
                            }
                            label={<Typography variant='caption' color={'primary.100'}>I agree to the code of conduct.</Typography>}
                        />
                    </Grid>
                    <Grid display="flex" justifyContent="space-between" gap={2}>
                        <Button onClick={() => setStep(step - 1)} variant="outlined" color="primary">
                            Back
                        </Button>
                        <Button disabled={!(formikStep3.dirty && formikStep3.isValid && !loading)} type="submit" variant="contained" color="primary">
                            {loading ?
                                <CircularProgress size={'24px'} />
                                :
                                'Submit'
                            }
                        </Button>
                    </Grid>
                </form>
            )}
        </>
    )
}

export default withCandidateAuth(CandidateCompletion)
