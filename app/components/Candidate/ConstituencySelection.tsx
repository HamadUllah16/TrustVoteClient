'use client'
import React, { useEffect, useMemo, useState } from 'react';
import { TextField, Autocomplete } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/redux/store';
import { allConstituency, balochistanConstituency, capitalConstituency, kpkConstituency, punjabConstituency, sindhConstituency } from '@/app/redux/features/constituencySlice';
import { balochistanProvincialConstituency, kpkProvincialConstituency, punjabProvincialConstituency, sindhProvincialConstituency } from '@/app/redux/features/provincialConstituenciesSlice';



const ConstituencySearch = ({ formikStep2 }: { formikStep2: any }) => {
    const { allConstituencies, data } = useSelector((state: RootState) => state.constituency)
    const { provincialConstituencies } = useSelector((state: RootState) => state.provincialConstituency)
    const [inputValue, setInputValue] = useState('');


    const constituencyOptions = useMemo(() => {
        if (formikStep2.values.constituencyType === 'national assembly') {
            return data.constituencies
                .map((c: any) => { return (c.area + "  " + c.constituency) });
        }
        if (formikStep2.values.constituencyType === 'provincial assembly') {
            return provincialConstituencies.constituencies
                .map((c: any) => { return (c.area + "  " + c.constituency) });
        }
    }, [data, provincialConstituencies, formikStep2.values.province]);

    const dispatch = useDispatch<AppDispatch>();



    useEffect(() => {
        if (formikStep2.values.constituencyType === 'national assembly') {
            dispatch(allConstituency());
        }
        if (formikStep2.values.constituencyType === 'national assembly' && formikStep2.values.province === 'punjab') {
            dispatch(punjabConstituency());
        }
        if (formikStep2.values.constituencyType === 'national assembly' && formikStep2.values.province === 'sindh') {
            dispatch(sindhConstituency());
        }
        if (formikStep2.values.constituencyType === 'national assembly' && formikStep2.values.province === 'balochistan') {
            dispatch(balochistanConstituency());
        }
        if (formikStep2.values.constituencyType === 'national assembly' && formikStep2.values.province === 'khyber pakhtunkhwa') {
            dispatch(kpkConstituency());
        }
        if (formikStep2.values.constituencyType === 'national assembly' && formikStep2.values.province === 'islamabad capital territory') {
            dispatch(capitalConstituency());
        }
        if (formikStep2.values.constituencyType === 'provincial assembly' && formikStep2.values.province === 'punjab') {
            dispatch(punjabProvincialConstituency())
        }
        if (formikStep2.values.constituencyType === 'provincial assembly' && formikStep2.values.province === 'sindh') {
            dispatch(sindhProvincialConstituency())
        }
        if (formikStep2.values.constituencyType === 'provincial assembly' && formikStep2.values.province === 'balochistan') {
            dispatch(balochistanProvincialConstituency())
        }
        if (formikStep2.values.constituencyType === 'provincial assembly' && formikStep2.values.province === 'khyber pakhtunkhwa') {
            dispatch(kpkProvincialConstituency())
        }
    }, [formikStep2.values.province, formikStep2.values.constituencyType])

    return (
        <Autocomplete
            fullWidth
            options={constituencyOptions || []}
            getOptionLabel={(option: any) => option}
            filterSelectedOptions
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
                formikStep2.setFieldValue('constituency', newInputValue);
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Constituency Name"
                    placeholder={formikStep2.values.constituencyType === 'national assembly' ? 'NA-7' : 'PK-18'}
                    error={formikStep2.touched.constituency && Boolean(formikStep2.errors.constituency)}
                    helperText={formikStep2.touched.constituency && formikStep2.errors.constituency}
                    fullWidth
                />
            )}
        />
    );
};

export default ConstituencySearch;
