'use client'
import { Autocomplete, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { balochistanConstituency, capitalConstituency, kpkConstituency, punjabConstituency, sindhConstituency } from '../redux/features/constituencySlice'
import { Circle } from '@mui/icons-material'
import { balochistanProvincialConstituency, kpkProvincialConstituency, punjabProvincialConstituency, sindhProvincialConstituency } from '../redux/features/provincialConstituenciesSlice'

function UserAddressConstituency({ formik }: { formik: any }) {
    const provinces = ['Punjab', 'Sindh', 'Khyber Pakhtunkhwa', 'Balochistan', 'Islamabad Capital Territory']
    const { kpk, balochistan, punjab, sindh, capital } = useSelector((state: RootState) => state.constituency)
    const { ps, pb, pk, pp } = useSelector((state: RootState) => state.provincialConstituency)
    const { constituency, province, provincialConstituency } = useSelector((state: RootState) => state.user.userProfile);
    const dispatch = useDispatch<AppDispatch>();

    const constituencies = useMemo(() => {
        switch (formik.values.province) {
            case 'punjab': return punjab;
            case 'sindh': return sindh;
            case 'khyber pakhtunkhwa': return kpk;
            case 'balochistan': return balochistan;
            case 'islamabad capital territory': return capital;
            default: return punjab;
        }
    }, [punjab, sindh, kpk, balochistan, capital])

    const provincialConstituencies = useMemo(() => {
        switch (formik.values.province) {
            case 'punjab': return pp;
            case 'sindh': return ps;
            case 'khyber pakhtunkhwa': return pk;
            case 'balochistan': return pb;
            default: return pp;
        }
    }, [pp, ps, pk, pb])



    useEffect(() => {
        if (formik.values.province === 'punjab') {
            dispatch(punjabConstituency());
            dispatch(punjabProvincialConstituency())
        }
        if (formik.values.province === 'islamabad capital territory') {
            dispatch(capitalConstituency());
        }
        if (formik.values.province === 'sindh') {
            dispatch(sindhConstituency());
            dispatch(sindhProvincialConstituency())
        }
        if (formik.values.province === 'balochistan') {
            dispatch(balochistanConstituency());
            dispatch(balochistanProvincialConstituency())
        }
        if (formik.values.province === 'khyber pakhtunkhwa') {
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
                    onChange={(event, value) => formik.setFieldValue('province', value?.toLowerCase())}
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
                            options={constituencies?.constituencies?.map((item: any) => `${item.area} ${item.constituency}`)}
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
                        {formik.values.province !== 'islamabad capital territory' &&
                            <Autocomplete
                                defaultValue={provincialConstituency}
                                options={provincialConstituencies?.constituencies?.map((item: any) => `${item.area} ${item.constituency}`)}
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
                        }
                    </>
                }
            </Stack>


        </Stack>
    )

}

export default UserAddressConstituency