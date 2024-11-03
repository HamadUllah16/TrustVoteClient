'use client'
import { Autocomplete, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { balochistanConstituency, capitalConstituency, kpkConstituency, punjabConstituency, sindhConstituency } from '../redux/features/constituencySlice'
import { Circle } from '@mui/icons-material'
import { balochistanProvincialConstituency, kpkProvincialConstituency, punjabProvincialConstituency, sindhProvincialConstituency } from '../redux/features/provincialConstituenciesSlice'

function UserAddressConstituency({ formik }: { formik: any }) {
    const provinces = ['Punjab', 'Sindh', 'Khyber Pakhtunkhwa', 'Balochistan', 'Islamabad Capital Territory']
    const { data } = useSelector((state: RootState) => state.constituency)
    const { provincialConstituencies } = useSelector((state: RootState) => state.provincialConstituency)
    const { constituency, province, provincialConstituency } = useSelector((state: RootState) => state.user.userProfile);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        if (formik.values.province === 'Punjab') {
            dispatch(punjabConstituency());
            dispatch(punjabProvincialConstituency())
        }
        if (formik.values.province === 'Islamabad Capital Territory') {
            dispatch(capitalConstituency());
        }
        if (formik.values.province === 'Sindh') {
            dispatch(sindhConstituency());
            dispatch(sindhProvincialConstituency())
        }
        if (formik.values.province === 'Balochistan') {
            dispatch(balochistanConstituency());
            dispatch(balochistanProvincialConstituency())
        }
        if (formik.values.province === 'Khyber Pakhtunkhwa') {
            dispatch(kpkConstituency());
            dispatch(kpkProvincialConstituency())
        }
    }, [formik.values.province])
    return (
        <Stack gap={1}>
            <Typography variant='subtitle1' color={'primary.main'}>
                Constituency
            </Typography>

            <Stack direction={'row'} gap={1}>
                <Autocomplete
                    options={provinces}
                    defaultValue={province}
                    onChange={(event, value) => formik.setFieldValue('province', value)}
                    fullWidth
                    renderInput={(params) => (
                        <TextField
                            name='province'
                            variant='filled'
                            {...params}
                            label='Constituency Province'
                        />
                    )}
                />
            </Stack>

            <Stack direction={'row'} gap={2}>

                {formik.values.province !== '' &&
                    <>
                        <Autocomplete
                            defaultValue={constituency}
                            options={data.constituencies.map((item: any) => `${item.area}  ${item.constituency}`)}
                            fullWidth
                            onChange={(event, value) => formik.setFieldValue('constituency', value)}
                            renderInput={(params) => (
                                <TextField
                                    name={'constituency'}
                                    variant='filled'
                                    {...params}
                                    label='National Constituency'
                                />
                            )}
                        />

                        <Autocomplete
                            defaultValue={provincialConstituency}
                            options={provincialConstituencies.constituencies.map((item: any) => `${item.area}  ${item.constituency}`)}
                            fullWidth
                            onChange={(event, value) => formik.setFieldValue('provincialConstituency', value)}
                            renderInput={(params) => (
                                <TextField
                                    name={'provincialConstituency'}
                                    variant='filled'
                                    {...params}
                                    label='Provincial Constituency'
                                />
                            )}
                        />
                    </>
                }
            </Stack>


        </Stack>
    )

}

export default UserAddressConstituency