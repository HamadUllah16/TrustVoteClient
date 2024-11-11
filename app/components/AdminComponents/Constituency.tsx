'use client'
import React, { useEffect, useState, useMemo, useCallback } from 'react'
import RenderTableHead from '../RenderTableHead'
import RenderConstituencyData from '../RenderConstituencyData'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/app/redux/store'
import {
    balochistanConstituency, capitalConstituency,
    kpkConstituency, punjabConstituency, sindhConstituency
} from '@/app/redux/features/constituencySlice'
import {
    balochistanProvincialConstituency, kpkProvincialConstituency,
    punjabProvincialConstituency, sindhProvincialConstituency
} from '@/app/redux/features/provincialConstituenciesSlice'
import { MenuItem, Stack, TablePagination, TextField } from '@mui/material'

function Constituency() {
    const [selectedConstituency, setSelectedConstituency] = useState('national assembly');
    const [selectedProvince, setSelectedProvince] = useState('punjab');
    const [page, setPage] = useState(0);

    const { punjab, sindh, kpk, balochistan, capital, loading } = useSelector((state: RootState) => state.constituency);
    const { all, pk, pp, pb, ps, loading: provincialLoading } = useSelector((state: RootState) => state.provincialConstituency);
    const dispatch = useDispatch<AppDispatch>();


    // Memoize constituency data based on selected assembly and province to avoid redundant fetching
    const tableData = useMemo(() => {
        if (selectedConstituency === 'national assembly') {
            switch (selectedProvince) {
                case 'punjab': return punjab;
                case 'sindh': return sindh;
                case 'kpk': return kpk;
                case 'balochistan': return balochistan;
                case 'capital': return capital;
                default: return { province: '', constituencies: [] };
            }
        } else {
            switch (selectedProvince) {
                case 'punjab': return pp;
                case 'sindh': return ps;
                case 'kpk': return pk;
                case 'balochistan': return pb;
                default: return { province: '', constituencies: [] };
            }
        }
    }, [selectedConstituency, selectedProvince, punjab, sindh, kpk, balochistan, capital, pp, ps, pk, pb]);

    // Efficiently dispatch data-fetching actions
    const fetchConstituencies = useCallback(() => {
        if (selectedConstituency === 'national assembly') {
            switch (selectedProvince) {
                case 'punjab': dispatch(punjabConstituency()); break;
                case 'sindh': dispatch(sindhConstituency()); break;
                case 'kpk': dispatch(kpkConstituency()); break;
                case 'balochistan': dispatch(balochistanConstituency()); break;
                case 'capital': dispatch(capitalConstituency()); break;
                default: dispatch(punjabConstituency());
            }
        } else {
            switch (selectedProvince) {
                case 'punjab': dispatch(punjabProvincialConstituency()); break;
                case 'sindh': dispatch(sindhProvincialConstituency()); break;
                case 'kpk': dispatch(kpkProvincialConstituency()); break;
                case 'balochistan': dispatch(balochistanProvincialConstituency()); break;
                default: dispatch(punjabProvincialConstituency());
            }
        }
    }, [dispatch, selectedConstituency, selectedProvince]);


    useEffect(() => {
        fetchConstituencies();
    }, [fetchConstituencies]);

    const handlePageChange = () => setPage(page + 1);

    return (
        <>
            <Stack direction={'row'} justifyContent={'end'} gap={2}>

                <TextField
                    variant='filled'
                    label='Assembly'
                    select
                    defaultValue={selectedConstituency}
                    onChange={(e) => setSelectedConstituency(e.target.value)}
                >
                    <MenuItem value='national assembly'>National Assembly</MenuItem>
                    <MenuItem value='provincial assembly'>Provincial Assembly</MenuItem>
                </TextField>

                <TextField
                    sx={{
                        width: 200
                    }}
                    variant='filled'
                    label='Province'
                    select
                    defaultValue={selectedProvince}
                    onChange={(e) => setSelectedProvince(e.target.value)}
                >
                    <MenuItem value='punjab'>Punjab</MenuItem>
                    <MenuItem value='sindh'>Sindh</MenuItem>
                    <MenuItem value='kpk'>KPK</MenuItem>
                    <MenuItem value='balochistan'>Balochistan</MenuItem>
                </TextField>

            </Stack>

            <RenderTableHead
                labels={['#', 'Constituency', 'Area', 'Province']}
            >
                <RenderConstituencyData
                    tableData={tableData}
                    action={null}
                    loading={loading || provincialLoading}
                />
            </RenderTableHead>

            {/* <Stack borderRadius={1} bgcolor={'background.default'}>
                <TablePagination
                    component='div'
                    count={200}
                    page={page}
                    onPageChange={handlePageChange}
                    rowsPerPage={20}
                    rowsPerPageOptions={[20]}
                />
            </Stack> */}
        </>
    );
}

export default Constituency;
