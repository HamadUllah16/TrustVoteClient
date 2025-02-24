'use client'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { updateCandidateProfile } from '../../redux/features/candidateSlice'
import { AppDispatch, RootState } from '@/app/redux/store'
import { Button, Checkbox, CircularProgress, Divider, FormControlLabel, Grid, InputAdornment, MenuItem, Stack, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { allPoliticalParties } from '@/app/redux/features/profileCompletionSlice'
import ConstituencySelect from './ConstituencySelection'
import { getAllConstituency } from '@/app/redux/features/constituencySlice'
import ProfilePicture from '../ProfilePicture'
import { setUserProfile } from '@/app/redux/features/userSlice'
import { Check, Info, Verified } from '@mui/icons-material'
import Image from 'next/image'
import ProfileCompletionVerificationStatus from '../ProfileCompletionVerificationStatus'


function CandidateCompletion() {
    const dispatch = useDispatch<AppDispatch>();
    const { loading } = useSelector((state: RootState) => state.candidate)
    const { allParties } = useSelector((state: RootState) => state.profileCompletion)
    const { userProfile } = useSelector((state: RootState) => state.user)
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter()

    const shouldDisable = userProfile.profileCompletion && userProfile.status === 'verified'

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
        province: Yup.string().required('province is required'),
        partyAffiliation: Yup.string().required('Party Affiliation is required'),
    });

    const validationSchemaStep3 = Yup.object({
        cnicFront: Yup.mixed().required('CNIC Front Image is required'),
        cnicBack: Yup.mixed().required('CNIC Back Image is required'),
        educationalCertificates: Yup.mixed().required('Educational Certificates are required'),
        assetDeclaration: Yup.mixed().required('Asset Declaration is required'),
        manifesto: Yup.mixed().required('Manifesto is required'),
        codeOfConduct: Yup.boolean()
            .oneOf([true], 'You must agree to the code of conduct')
            .required('Agreement is required'),
    });

    // Formik steps
    const formikStep1 = useFormik({
        initialValues: {
            profilePicture: userProfile.profilePicture ?? '',
            firstName: userProfile.firstName ?? '',
            lastName: userProfile.lastName ?? '',
            phone: userProfile.phone ?? '',
            dateOfBirth: userProfile.dateOfBirth ?? '',
            gender: userProfile.gender ?? '',
        },
        enableReinitialize: true,
        validationSchema: validationSchemaStep1,
        onSubmit: (values) => {
            const token = localStorage.getItem('x_auth_token');
            dispatch(updateCandidateProfile({ profile: values, router, token }));
        },
    });

    const formikStep2 = useFormik({
        initialValues: {
            cnicNumber: userProfile.cnicNumber ?? '',
            constituencyType: userProfile.constituencyType ?? '',
            constituency: userProfile.constituency ?? '',
            partyAffiliation: userProfile.partyAffiliation ?? '',
            province: userProfile.province ?? '',
        },
        validationSchema: validationSchemaStep2,
        onSubmit: (values) => {
            const token = localStorage.getItem('x_auth_token')
            dispatch(updateCandidateProfile({ profile: values, router, token }));
        },
    });



    const formikStep3 = useFormik({
        initialValues: {
            cnicFront: userProfile.cnicFront ?? '',
            cnicBack: userProfile.cnicBack ?? '',
            educationalCertificates: userProfile.educationalCertificates ?? '',
            assetDeclaration: userProfile.assetDeclaration ?? '',
            manifesto: userProfile.manifesto ?? '',
            codeOfConduct: userProfile.codeOfConduct ?? '',
        },
        validationSchema: validationSchemaStep3,
        onSubmit: (values) => {
            const token = localStorage.getItem('x_auth_token')
            dispatch(updateCandidateProfile({ profile: values, router, token }));
        },
    });

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>, fieldName: string, setFieldValue: any, fileType: string) => {
        const file = event.currentTarget.files?.[0];
        if (file) {
            if (fileType === 'pdf' && file.type !== 'application/pdf') {
                setErrorMessage('Invalid file type. Supported file type is: PDF');

                // clearing out state and name of file
                formikStep2.setFieldValue(fieldName, '');
                event.currentTarget.value = '';

                return;
            }
            if (fileType === 'image' && !(file.type === 'image/png' || file.type === 'image/jpeg')) {
                setErrorMessage('Invalid file type. Supported file type is: PNG/JPG');

                // clearing out state and name of file
                formikStep2.setFieldValue(fieldName, '');
                event.currentTarget.value = '';

                return
            }
            setErrorMessage('');
            setFieldValue(fieldName, file);
        };
    }

    useEffect(() => {
        dispatch(allPoliticalParties());
    }, [])

    return (
        <>
            {userProfile.status === 'pending' ?
                <Stack gap={2} p={5} bgcolor={'secondary.200'} borderRadius={2} alignItems={'center'}>
                    <Info sx={{ color: 'primary.main' }} fontSize='large' />

                    <Typography color={'primary.contrastText'} variant='subtitle1' fontWeight={'700'}>
                        Your profile is being reviewed.
                    </Typography>
                </Stack>
                :
                <>
                    <form onSubmit={formikStep1.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <Divider />
                        <Stack direction={'row'} gap={2} alignItems={'center'}>
                            <ProfilePicture
                                fieldName='profilePicture'
                                formik={formikStep1}
                                currentPicture={userProfile.profilePicture}
                            />
                            <Stack gap={2}>

                                <Stack direction={'row'} gap={2} sx={{ width: '100%' }}>
                                    <TextField
                                        variant='filled'
                                        fullWidth
                                        label='First Name'
                                        name="firstName"
                                        value={formikStep1.values.firstName}
                                        onChange={formikStep1.handleChange}
                                        error={formikStep1.touched.firstName && Boolean(formikStep1.errors.firstName)}
                                        onBlur={formikStep1.handleBlur}
                                        helperText={formikStep1.touched.firstName && formikStep1.errors.firstName}
                                        disabled={shouldDisable}
                                    />
                                    <TextField
                                        variant='filled'
                                        fullWidth
                                        label='Last Name'
                                        name="lastName"
                                        value={formikStep1.values.lastName}
                                        onChange={formikStep1.handleChange}
                                        error={formikStep1.touched.lastName && Boolean(formikStep1.errors.lastName)}
                                        onBlur={formikStep1.handleBlur}
                                        helperText={formikStep1.touched.lastName && formikStep1.errors.lastName}
                                        disabled={shouldDisable}
                                    />

                                    <TextField
                                        variant='filled'
                                        fullWidth
                                        label='Phone Number'
                                        name="phone"
                                        value={formikStep1.values.phone}
                                        onChange={formikStep1.handleChange}
                                        error={formikStep1.touched.phone && Boolean(formikStep1.errors.phone)}
                                        onBlur={formikStep1.handleBlur}
                                        helperText={formikStep1.touched.phone && formikStep1.errors.phone}
                                        disabled={shouldDisable}
                                    />
                                </Stack>

                                <Stack direction={'row'} gap={2}>
                                    <TextField
                                        variant='filled'
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
                                        disabled={shouldDisable}
                                    />
                                    <TextField
                                        variant='filled'
                                        fullWidth
                                        select
                                        label='Gender'
                                        name="gender"
                                        value={formikStep1.values.gender}
                                        onChange={formikStep1.handleChange}
                                        error={formikStep1.touched.gender && Boolean(formikStep1.errors.gender)}
                                        onBlur={formikStep1.handleBlur}
                                        helperText={formikStep1.touched.gender && formikStep1.errors.gender}
                                        disabled={shouldDisable}
                                    >
                                        <MenuItem value="male">Male</MenuItem>
                                        <MenuItem value="female">Female</MenuItem>
                                        <MenuItem value="other">Other</MenuItem>
                                    </TextField>
                                </Stack>
                            </Stack>
                        </Stack>
                        <Grid display="flex" justifyContent="end" gap={2}>
                            <Button disabled={!(formikStep1.isValid && formikStep1.dirty && !loading)} type="submit" variant="contained" color="primary">
                                Save
                            </Button>
                        </Grid>
                    </form>

                    {shouldDisable ?
                        <div className='flex justify-center items-center w-full p-6 gap-2'>
                            <Typography variant='h6' color={"secondary.100"}>
                                Your Profile Is Verified
                            </Typography>
                            <Check htmlColor={'#22BB33'} />
                        </div>
                        :
                        <>
                            <form onSubmit={formikStep2.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <Typography variant='h4' gutterBottom color={'primary.main'}>
                                    Additional Candidate Information
                                </Typography>
                                <Divider />
                                <Grid display={'flex'} gap={2}>
                                    <TextField
                                        variant='filled'
                                        fullWidth
                                        label='CNIC Number'
                                        placeholder='17301-1234567-8'
                                        name="cnicNumber"
                                        value={formikStep2.values.cnicNumber}
                                        onChange={formikStep2.handleChange}
                                        error={formikStep2.touched.cnicNumber && Boolean(formikStep2.errors.cnicNumber)}
                                    />
                                </Grid>
                                <Grid display={'flex'} gap={2}>
                                    <TextField
                                        variant='filled'
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
                                        variant='filled'
                                        fullWidth
                                        select
                                        label='Province'
                                        name="province"
                                        value={formikStep2.values.province.split(' ')[1]}
                                        onChange={formikStep2.handleChange}
                                        error={formikStep2.touched.province && Boolean(formikStep2.errors.province)}
                                        helperText={formikStep2.touched.province && formikStep2.errors.province}
                                    >
                                        <MenuItem value="punjab">Punjab</MenuItem>
                                        <MenuItem value="sindh">Sindh</MenuItem>
                                        <MenuItem value="balochistan">Balochistan</MenuItem>
                                        <MenuItem value="khyber pakhtunkhwa">Khyber Pakhtunkhwa</MenuItem>
                                        {formikStep2.values.constituencyType === 'national assembly' &&
                                            <MenuItem value="islamabad capital territory">Islamabad Capital Territory</MenuItem>
                                        }
                                    </TextField>



                                </Grid>
                                <Grid display={'flex'} gap={2}>

                                    {/* Constituency Selection */}
                                    <ConstituencySelect
                                        formikStep2={formikStep2}
                                    />

                                    <TextField
                                        variant='filled'
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
                                                <MenuItem key={index} value={party.name} sx={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between'
                                                }}>
                                                    <p>{party.name}</p>
                                                    <Image src={party.symbol} width={20} height={20} alt='a symbol' />
                                                </MenuItem>
                                            )
                                        })}
                                    </TextField>

                                </Grid>
                                <Typography variant='body2' color={'error'}>
                                    {errorMessage}
                                </Typography>
                                <Grid display="flex" justifyContent="end" gap={2}>
                                    <Button disabled={!(formikStep2.isValid && formikStep2.dirty && !loading)} type="submit" variant="contained" color="primary">
                                        Save
                                    </Button>
                                </Grid>
                            </form >

                            <form onSubmit={formikStep3.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <Typography variant='h4' color={'primary.main'}>
                                    Legal and Compliance
                                </Typography>
                                <Divider />
                                <Grid display={'flex'} gap={2}>
                                    <TextField
                                        variant='filled'
                                        fullWidth
                                        label='CNIC Front Image'
                                        type="file"
                                        name="cnicFront"
                                        InputLabelProps={{ shrink: true }}
                                        onChange={(event: any) => handleFileChange(event, "cnicFront", formikStep3.setFieldValue, 'image')}
                                        error={formikStep3.touched.cnicFront && Boolean(formikStep3.errors.cnicFront)}
                                        helperText={formikStep3.touched.cnicFront && formikStep3.errors.cnicFront}
                                    />
                                    <TextField
                                        variant='filled'
                                        fullWidth
                                        label='CNIC Back Image'
                                        type="file"
                                        name="cnicBack"
                                        InputLabelProps={{ shrink: true }}
                                        onChange={(event: any) => handleFileChange(event, "cnicBack", formikStep3.setFieldValue, 'image')}
                                        error={formikStep3.touched.cnicBack && Boolean(formikStep3.errors.cnicBack)}
                                        helperText={formikStep3.touched.cnicBack && formikStep3.errors.cnicBack}
                                    />
                                </Grid>
                                <TextField
                                    variant='filled'
                                    fullWidth
                                    label='Educational Certificates (highest/recent degree)'
                                    type="file"
                                    name="educationalCertificates"
                                    InputLabelProps={{ shrink: true }}
                                    onChange={(event: any) => handleFileChange(event, "educationalCertificates", formikStep3.setFieldValue, 'pdf')}
                                    error={formikStep3.touched.educationalCertificates && Boolean(formikStep3.errors.educationalCertificates)}
                                    helperText={formikStep3.touched.educationalCertificates && formikStep3.errors.educationalCertificates}
                                />
                                <Grid display={'flex'} gap={2} alignItems="center">
                                    <TextField
                                        variant='filled'
                                        fullWidth
                                        label='Asset Declaration'
                                        type="file"
                                        name="assetDeclaration"
                                        InputLabelProps={{ shrink: true }}
                                        onChange={(event: any) => handleFileChange(event, "assetDeclaration", formikStep3.setFieldValue, 'pdf')}
                                        error={formikStep3.touched.assetDeclaration && Boolean(formikStep3.errors.assetDeclaration)}
                                        helperText={formikStep3.touched.assetDeclaration && formikStep3.errors.assetDeclaration}
                                    />
                                    <TextField
                                        variant='filled'
                                        fullWidth
                                        label='Manifesto Upload (PDF)'
                                        type="file"
                                        name="manifesto"
                                        InputLabelProps={{ shrink: true }}
                                        onChange={(event: any) => handleFileChange(event, "manifesto", formikStep3.setFieldValue, 'pdf')}
                                        error={formikStep3.touched.manifesto && Boolean(formikStep3.errors.manifesto)}
                                        helperText={formikStep3.touched.manifesto && formikStep3.errors.manifesto}
                                    />
                                </Grid>
                                <FormControlLabel
                                    color='primary.200'
                                    control={
                                        <Checkbox
                                            name="codeOfConduct"
                                            checked={formikStep3.values.codeOfConduct}
                                            onChange={(e) => {
                                                formikStep3.setFieldValue(
                                                    'codeOfConduct',
                                                    e.target.checked
                                                );
                                            }}
                                        />
                                    }
                                    label={<Typography variant='caption' color={'primary.100'}>I agree to the code of conduct.</Typography>}
                                />
                                <Typography variant='body2' color={'error'}>
                                    {errorMessage}
                                </Typography>
                                <Grid display="flex" justifyContent="end" >
                                    <Button disabled={!(formikStep3.dirty && formikStep3.isValid && !loading)} type="submit" variant="contained" color="primary">
                                        Save
                                    </Button>
                                </Grid>
                            </form>
                        </>
                    }
                </>
            }
        </>
    )
}

export default CandidateCompletion
