'use client'
import React, { useState } from 'react';
import Modal from '../Modal';
import { Divider, Stack, TextField, Typography, Button, IconButton, CircularProgress } from '@mui/material';
import { Cancel } from '@mui/icons-material';
import { FormikValues, useFormik } from 'formik';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/redux/store';
import { addPoliticalParty } from '@/app/redux/features/adminSlice';

function AddPoliticalParty({ display, setDisplay }: { display: boolean, setDisplay: React.Dispatch<React.SetStateAction<boolean>> }) {
    const { loading } = useSelector((state: RootState) => state.admin)
    const dispatch = useDispatch<AppDispatch>();
    const [errorMessage, setErrorMessage] = useState('');
    const [previewUrl, setPreviewUrl] = useState('');
    const formik = useFormik({
        initialValues: {
            name: '',
            abbreviation: '',
            symbol: null,
        },
        onSubmit(values) {
            console.log('Form values:', values);
            const token = localStorage.getItem('x_auth_token')
            dispatch(addPoliticalParty({ party: values, setDisplay: setDisplay, token }))
        },
        validate(values) {
            const errors: FormikValues = {};
            if (!values.name) {
                errors.name = 'Name is required.';
            }
            if (!values.abbreviation) {
                errors.abbreviation = 'Abbreviation is required.';
            }
            if (!values.symbol) {
                errors.symbol = 'Symbol is required.'
            }
            console.log(errors)
            return errors;
        },
    });

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>, fieldName: string, setFieldValue: any, fileType: string) => {
        const file = event.currentTarget.files?.[0];
        if (file) {
            if (fileType === 'pdf' && file.type !== 'application/pdf') {
                setErrorMessage('Invalid file type. Supported file type is: PDF');

                // clearing out state and name of file
                formik.setFieldValue(fieldName, '');
                event.currentTarget.value = '';

                return;
            }
            if (fileType === 'image' && !(file.type === 'image/png' || file.type === 'image/jpeg')) {
                setErrorMessage('Invalid file type. Supported file type is: PNG/JPG');

                // clearing out state and name of file
                formik.setFieldValue(fieldName, '');
                event.currentTarget.value = '';

                return
            }
            setErrorMessage('');
            setFieldValue(fieldName, file);

            if (fileType === 'image') {
                const url = URL.createObjectURL(file);
                setPreviewUrl(url);
            }
        };

    }

    return (
        <Modal>
            <form onSubmit={formik.handleSubmit}>
                <Stack
                    sx={{
                        opacity: display ? 1 : 0,
                        transform: `scale(${display ? 1 : 0})`,
                        transition: '0.3s all'
                    }}
                    gap={2}
                    boxShadow={5}
                    bgcolor={'background.default'}
                    border={'1px solid'}
                    borderColor={'secondary.200'}
                    p={2}
                    borderRadius={2}
                    minWidth={500}
                >
                    <Stack direction={'row'} gap={1} justifyContent={'space-between'}>
                        <Typography variant='h5' color={'primary.main'}>Add a Political Party</Typography>
                        <IconButton sx={{ p: 0 }} onClick={() => setDisplay(false)}>
                            <Cancel fontSize='medium' sx={{ color: 'primary.main' }} />
                        </IconButton>
                    </Stack>
                    <Divider sx={{ borderColor: 'secondary.200' }} />

                    <Stack gap={2}>
                        <TextField
                            variant='filled'
                            label='Name'
                            placeholder='Pakistan Peoples Party'
                            name='name'
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                        <TextField
                            variant='filled'
                            label='Abbreviation'
                            placeholder='PPP'
                            name='abbreviation'
                            value={formik.values.abbreviation}
                            onChange={formik.handleChange}
                            error={formik.touched.abbreviation && Boolean(formik.errors.abbreviation)}
                            helperText={formik.touched.abbreviation && formik.errors.abbreviation}
                            inputProps={{
                                style: {
                                    textTransform: 'uppercase'
                                }
                            }}
                        />
                        <TextField
                            variant='filled'
                            name='symbol'
                            type='file'
                            label='Party Symbol'
                            InputLabelProps={{ shrink: true }}
                            onChange={(event: any) => handleFileChange(event, 'symbol', formik.setFieldValue, 'image')}
                            error={formik.touched.symbol && Boolean(formik.errors.symbol)}
                            helperText={formik.touched.symbol && Boolean(formik.errors.symbol)}
                            inputProps={{ accept: '.jpg, .png' }}
                        />
                        {formik.values.symbol &&
                            <Stack p={1} borderRadius={1} border={'1px solid #DADADA'} width={'fit-content'}>
                                <Image
                                    height={100}
                                    width={100}
                                    src={previewUrl}
                                    alt='symbol picture'
                                />
                            </Stack>
                        }
                    </Stack>

                    <Stack direction={'row'} justifyContent={'flex-end'} mt={2}>
                        <Button disabled={!(formik.isValid && formik.dirty && !loading)} variant='contained' color='primary' type='submit'>
                            {loading ?
                                <CircularProgress size={'24px'} />
                                :
                                "Submit"
                            }
                        </Button>
                    </Stack>
                </Stack>
            </form>
        </Modal>
    );
}

export default AddPoliticalParty;
