'use client'
import React, { useEffect, useMemo, useState } from 'react';
import { TextField, Autocomplete } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/redux/store';
import { allConstituency } from '@/app/redux/features/constituencySlice';



const ConstituencySearch = ({ formikStep2 }: { formikStep2: any }) => {
    const { allConstituencies } = useSelector((state: RootState) => state.constituency)
    const [inputValue, setInputValue] = useState('');


    const constituencyOptions = useMemo(() => {
        return allConstituencies
            .flatMap((item: any) => item.constituencies.map((c: any) => c.area + "  " + c.constituency)) || [];
    }, [allConstituencies]);

    const dispatch = useDispatch<AppDispatch>();



    useEffect(() => {
        dispatch(allConstituency());
    }, [])

    return (
        <Autocomplete
            fullWidth
            options={constituencyOptions}
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
