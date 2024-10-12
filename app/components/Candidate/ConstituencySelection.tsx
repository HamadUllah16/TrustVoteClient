import React, { useMemo, useState } from 'react';
import { TextField, Autocomplete } from '@mui/material';



const ConstituencySearch = ({ formikStep2 }: { formikStep2: any }) => {
    const [inputValue, setInputValue] = useState('');


    const assemblySeats = {
        balochistan: 16,
        kpk: 45,
        punjab: 141,
        sindh: 61,
        federalCapital: 3,
    };

    const generateConstituencies = (seats: any) => {
        return Array.from({ length: seats }).map((_, index) => index + 1);
    };

    // const allConstituencies = useMemo(() => {
    //     if (formikStep2.values.constituencyType === 'national assembly') {
    //         return [
    //             ...generateConstituencies(nationAssemblySeats.balochistan),
    //             ...generateConstituencies(nationAssemblySeats.kpk),
    //             ...generateConstituencies(nationAssemblySeats.punjab),
    //             ...generateConstituencies(nationAssemblySeats.sindh),
    //             ...generateConstituencies(nationAssemblySeats.federalCapital),
    //         ];
    //     } else if (formikStep2.values.constituencyType === 'provincial assembly') {
    //         return [

    //             // ...generateConstituencies("PB-" + nationAssemblySeats.balochistan),
    //             // ...generateConstituencies("PK-" + nationAssemblySeats.kpk),
    //             // ...generateConstituencies("PP-" + nationAssemblySeats.punjab),
    //             // ...generateConstituencies("PS-" + nationAssemblySeats.sindh),
    //         ];
    //     }
    //     return [];
    // }, [formikStep2.values.constituencyType]);

    const nationalConstituency = useMemo(() => {
        return [
            ...Array.from({ length: assemblySeats.balochistan + assemblySeats.federalCapital + assemblySeats.kpk + assemblySeats.punjab + assemblySeats.sindh })
                .map((_, index: number) => `NA-${index + 1}`)
        ]
    }, [formikStep2.values.constituencyType])

    const provincialConstituency = useMemo(() => {
        return [
            ...Array.from({ length: assemblySeats.balochistan }).map((_, index: number) => `PB-${index + 1}`),
            ...Array.from({ length: assemblySeats.kpk }).map((_, index: number) => `PK-${index + 1}`),
            ...Array.from({ length: assemblySeats.punjab }).map((_, index: number) => `PP-${index + 1}`),
            ...Array.from({ length: assemblySeats.sindh }).map((_, index: number) => `PS-${index + 1}`)
        ];
    }, [formikStep2.values.constituencyType])


    return (
        <Autocomplete
            fullWidth
            options={
                formikStep2.values.constituencyType === 'national assembly'
                    ?
                    nationalConstituency
                    :
                    formikStep2.values.constituencyType === 'provinicial assembly'
                        ?
                        provincialConstituency
                        :
                        []
            }
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
