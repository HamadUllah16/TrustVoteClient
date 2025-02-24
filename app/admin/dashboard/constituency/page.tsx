'use client'
import AdminSidebar from '@/app/components/AdminComponents/AdminSidebar'
import Constituency from '@/app/components/AdminComponents/Constituency'
import MainWrapper from '@/app/components/MainWrapper'
import Modal from '@/app/components/Modal'
import PageHeader from '@/app/components/PageHeader'
import { addConstituency } from '@/app/redux/features/constituencySlice'
import { addProvincialConstituency } from '@/app/redux/features/provincialConstituenciesSlice'
import { AppDispatch } from '@/app/redux/store'
import { Add } from '@mui/icons-material'
import { Button, IconButton, MenuItem, Stack, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'

function ConstituencyPage() {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const formik = useFormik({
        initialValues: {
            constituencyName: '',
            area: '',
            province: '',
            assembly: '',
        },
        onSubmit: (values) => {
            const { assembly, ...restValues } = values;

            // api call based on assembly selection + toast popup

            dispatch(assembly === 'national assembly'
                ?
                addConstituency(restValues)
                :
                addProvincialConstituency(restValues))

            // setShowModal(false);
            console.log(restValues);
        },
        validate(values) {
            let errors: any = {}

            if (values.area === '') {
                errors.area = 'Area cannot be empty!'
            }
            if (values.assembly === '') {
                errors.assembly = 'Assembly type cannot be empty.'
            }
            if (values.constituencyName === '') {
                errors.constituencyName = 'Constituency name cannot be empty.';
            }
            if (values.province === '') {
                errors.province = 'Province cannot be empty.';
            }

            return errors;
        },
    })

    return (
        <MainWrapper>
            <AdminSidebar />

            <PageHeader
                title='Constituency'
                subtitle='View and perform actions on Constituencies.'
                action={
                    <Stack direction={'row'} gap={2}>
                        <IconButton onClick={() => setShowModal(true)}>
                            <Add sx={{ color: 'primary.main' }} />
                        </IconButton>
                    </Stack>
                }
            >
                {/* render constituency table */}
                <Constituency />

                {showModal &&
                    <Modal>
                        <Stack
                            width={500}
                            p={3}
                            border={'1px solid'}
                            borderColor={'secondary.200'}
                            borderRadius={1}
                            bgcolor={'secondary.main'}
                        >
                            <form onSubmit={formik.handleSubmit}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '24px'
                                }}
                            >

                                <Typography textAlign={'center'} variant='h4' color={'primary.main'}>
                                    Add Constituency
                                </Typography>

                                <Stack gap={1}>
                                    <TextField
                                        label={'Assembly'}
                                        placeholder='National Assembly'
                                        select
                                        name='assembly'
                                        onChange={formik.handleChange}
                                        helperText={formik.touched.assembly && formik.errors.assembly}
                                        error={formik.touched.assembly && Boolean(formik.errors.assembly)}
                                    >
                                        <MenuItem value='national assembly'>National Assembly</MenuItem>
                                        <MenuItem value='provincial assembly'>Provincial Assembly</MenuItem>
                                    </TextField>

                                    {formik.values.assembly !== '' &&
                                        <TextField
                                            label={'Province'}
                                            select
                                            name='province'
                                            onChange={formik.handleChange}
                                            helperText={formik.touched.province && formik.errors.province}
                                            error={formik.touched.province && Boolean(formik.errors.province)}
                                        >
                                            {formik.values.assembly === 'national assembly' &&
                                                <MenuItem value='islamabad capital territory'>Islamabd & Capital Territories</MenuItem>
                                            }
                                            <MenuItem value='punjab'>Punjab</MenuItem>
                                            <MenuItem value="sindh">Sindh</MenuItem>
                                            <MenuItem value='khyber pakhtunkhwa'>Khyber Pakhtunkhwa</MenuItem>
                                            <MenuItem value='balochistan'>Balochistan</MenuItem>
                                        </TextField>
                                    }
                                    <TextField
                                        name={'constituencyName'}
                                        variant='filled'
                                        label='Constituency Name'
                                        placeholder='NA-27'
                                        onChange={(e => formik.handleChange({ target: { name: e.target.name, value: e.target.value.toLocaleUpperCase() } }))}
                                        helperText={formik.touched.constituencyName && formik.errors.constituencyName}
                                        error={formik.touched.constituencyName && Boolean(formik.errors.constituencyName)}
                                        inputProps={{
                                            style: {
                                                textTransform: 'uppercase'
                                            }
                                        }}
                                    />
                                    <TextField
                                        name='area'
                                        variant='filled'
                                        label='Area'
                                        placeholder='Peshawar-I'
                                        onChange={formik.handleChange}
                                        helperText={formik.touched.area && formik.errors.area}
                                        error={formik.touched.area && Boolean(formik.errors.area)}
                                    />

                                </Stack>

                                <Stack direction={'row'} gap={1}>
                                    <Button
                                        disabled={!(formik.isValid && formik.dirty)}
                                        type='submit'
                                        fullWidth
                                        variant='contained'
                                    >
                                        Add Constituency
                                    </Button>
                                    <Button
                                        fullWidth
                                        variant='outlined'
                                        onClick={() => setShowModal(false)}
                                    >
                                        Cancel
                                    </Button>
                                </Stack>
                            </form>
                        </Stack>
                    </Modal>
                }
            </PageHeader>

        </MainWrapper>
    )
}

export default ConstituencyPage