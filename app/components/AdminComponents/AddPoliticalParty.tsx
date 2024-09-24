'use client'
import React from 'react';
import Modal from '../Modal';
import { Divider, Stack, TextField, Typography, Button, IconButton, CircularProgress } from '@mui/material';
import { Cancel } from '@mui/icons-material';
import { FormikValues, useFormik } from 'formik';
import handleFileChange from '../handleImageInput';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/redux/store';
import { addPoliticalParty } from '@/app/redux/features/adminSlice';

function AddPoliticalParty({ display, setDisplay }: { display: boolean, setDisplay: React.Dispatch<React.SetStateAction<boolean>> }) {
    const { loading } = useSelector((state: RootState) => state.admin)
    const dispatch = useDispatch<AppDispatch>();
    const formik = useFormik({
        initialValues: {
            name: '',
            abbreviation: '',
            symbol: null,
        },
        onSubmit(values) {
            console.log('Form values:', values);
            dispatch(addPoliticalParty({ party: values, setDisplay: setDisplay }))
        },
        validate(values) {
            const errors: FormikValues = {};
            if (!values.name) {
                errors.name = 'Required';
            }
            if (!values.abbreviation) {
                errors.abbreviation = 'Required';
            }
            return errors;
        },
    });

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
                    bgcolor={'white'}
                    border={'1px solid #DADADA'}
                    p={2}
                    borderRadius={2}
                    minWidth={400}
                >
                    <Stack direction={'row'} gap={1} justifyContent={'space-between'}>
                        <Typography variant='h6'>Add a Political Party</Typography>
                        <IconButton sx={{ p: 0 }} onClick={() => setDisplay(false)}>
                            <Cancel fontSize='medium' />
                        </IconButton>
                    </Stack>
                    <Divider />

                    <Stack gap={2}>
                        <TextField
                            label='Name'
                            placeholder='Pakistan Peoples Party'
                            name='name'
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                        <TextField
                            label='Abbreviation'
                            placeholder='PPP'
                            name='abbreviation'
                            value={formik.values.abbreviation}
                            onChange={formik.handleChange}
                            error={formik.touched.abbreviation && Boolean(formik.errors.abbreviation)}
                            helperText={formik.touched.abbreviation && formik.errors.abbreviation}
                        />
                        <TextField
                            name='symbol'
                            type='file'
                            label='Party Symbol'
                            InputLabelProps={{ shrink: true }}
                            onChange={(event: any) => handleFileChange(event, 'symbol', formik)}
                            error={formik.touched.symbol && Boolean(formik.errors.symbol)}
                            helperText={formik.touched.symbol && formik.errors.symbol}
                            inputProps={{ accept: '.jpg, .png' }}
                        />
                        {formik.values.symbol &&
                            <Stack p={1} borderRadius={1} border={'1px solid #DADADA'} width={'fit-content'}>
                                <Image
                                    height={100}
                                    width={100}
                                    src={formik.values.symbol}
                                    alt='symbol picture'
                                />
                            </Stack>
                        }
                    </Stack>

                    <Stack direction={'row'} justifyContent={'flex-end'} mt={2}>
                        <Button disabled={!(formik.isValid && formik.dirty)} variant='contained' color='primary' type='submit'>
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
