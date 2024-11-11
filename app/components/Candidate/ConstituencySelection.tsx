'use client'
import React, { useEffect, useMemo, useState } from 'react';
import { TextField, Autocomplete } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/redux/store';
import {
    getAllConstituency, balochistanConstituency, capitalConstituency,
    kpkConstituency, punjabConstituency, sindhConstituency
} from '@/app/redux/features/constituencySlice';
import {
    balochistanProvincialConstituency, kpkProvincialConstituency,
    punjabProvincialConstituency, sindhProvincialConstituency
} from '@/app/redux/features/provincialConstituenciesSlice';

const ConstituencySearch = ({ formikStep2 }: { formikStep2: any }) => {
    const { kpk, punjab, sindh, balochistan, capital } = useSelector((state: RootState) => state.constituency);
    const { pk, pp, ps, pb } = useSelector((state: RootState) => state.provincialConstituency);
    const [inputValue, setInputValue] = useState('');
    const dispatch = useDispatch<AppDispatch>();

    function renderConstituencies(constituencies: { area: string, constituency: string }[]) {
        if (constituencies && constituencies.length > 0) {
            return constituencies.map(c => `${c.area} ${c.constituency}`);
        }
        return []
    }

    const constituencyOptions = useMemo(() => {
        if (formikStep2.values.constituencyType === 'national assembly') {
            switch (formikStep2.values.province) {
                case 'khyber pakhtunkhwa':
                    return renderConstituencies(kpk.constituencies);
                case 'punjab':
                    return renderConstituencies(punjab.constituencies);
                case 'sindh':
                    return renderConstituencies(sindh.constituencies);
                case 'balochistan':
                    return renderConstituencies(balochistan.constituencies);
                case 'capital':
                    return renderConstituencies(capital.constituencies);
                default:
                    return [];
            }
        }
        if (formikStep2.values.constituencyType === 'provincial assembly') {
            switch (formikStep2.values.province) {
                case 'khyber pakhtunkhwa':
                    return renderConstituencies(pk.constituencies);
                case 'punjab':
                    return renderConstituencies(pp.constituencies);
                case 'sindh':
                    return renderConstituencies(ps.constituencies);
                case 'balochistan':
                    return renderConstituencies(pb.constituencies);
                default:
                    return [];
            }
        }
        return [];
    }, [kpk, punjab, balochistan, sindh, capital, pk, pp, ps, pb, formikStep2.values.province, formikStep2.values.constituencyType]);

    useEffect(() => {
        if (formikStep2.values.constituencyType === 'national assembly') {
            if (formikStep2.values.province === 'punjab') dispatch(punjabConstituency());
            else if (formikStep2.values.province === 'sindh') dispatch(sindhConstituency());
            else if (formikStep2.values.province === 'balochistan') dispatch(balochistanConstituency());
            else if (formikStep2.values.province === 'khyber pakhtunkhwa') dispatch(kpkConstituency());
            else if (formikStep2.values.province === 'islamabad capital territory') dispatch(capitalConstituency());
        } else if (formikStep2.values.constituencyType === 'provincial assembly') {
            if (formikStep2.values.province === 'punjab') dispatch(punjabProvincialConstituency());
            else if (formikStep2.values.province === 'sindh') dispatch(sindhProvincialConstituency());
            else if (formikStep2.values.province === 'balochistan') dispatch(balochistanProvincialConstituency());
            else if (formikStep2.values.province === 'khyber pakhtunkhwa') dispatch(kpkProvincialConstituency());
        }
    }, [dispatch, formikStep2.values.province, formikStep2.values.constituencyType]);

    return (
        <Autocomplete
            fullWidth
            options={constituencyOptions || []}
            getOptionLabel={(option: string) => option}
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
