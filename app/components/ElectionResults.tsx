'use client'
import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Autocomplete, Button, MenuItem, Stack, TextField } from '@mui/material'
import RenderTableData from '@/app/components/RenderTableData'
import RenderTableHead from '@/app/components/RenderTableHead'
import { getAllConstituency } from '@/app/redux/features/constituencySlice'
import { allProvincialConstituencies } from '@/app/redux/features/provincialConstituenciesSlice'
import { searchCandidatesOffConstituency } from '@/app/redux/features/userSlice'
import { AppDispatch, RootState } from '@/app/redux/store'
import { getApprovedCandidates } from '@/app/redux/features/candidateSlice'
import { getElectionSession } from '../redux/features/electionSessionSlice'
import PageHeader from './PageHeader'

function ElectionResults() {
    const [userConstituency, setUserConstituency] = useState<null | string>('');
    const [page, setPage] = useState(0);
    const [specificConstituency, setSpecificConstituency] = useState('');
    const [currentTable, setCurrentTable] = useState('all');
    const dispatch = useDispatch<AppDispatch>();

    const { status } = useSelector((state: RootState) => state.electionSession.electionSession);
    const { approvedCandidates } = useSelector((state: RootState) => state.candidate);
    const { allConstituencies, loading } = useSelector((state: RootState) => state.constituency);
    const { all } = useSelector((state: RootState) => state.provincialConstituency);
    const { searchedCandidates } = useSelector((state: RootState) => state.user);

    const allNationalConstituencies = useMemo(() =>
        allConstituencies.flatMap((province: any) =>
            province.constituencies.map((eachConstituency: any) => `${eachConstituency.area} ${eachConstituency.constituency}`)
        ),
        [allConstituencies]
    );
    const allProvincial = useMemo(() =>
        all.flatMap((province: any) =>
            province.constituencies.map((eachConstituency: any) => `${eachConstituency.area} ${eachConstituency.constituency}`)
        ),
        [all]
    );

    const handlePageChange = () => {
        setPage(page + 1);
    }

    const sortedCandidates = sortCandidatesByVotes(approvedCandidates);

    function sortCandidatesByVotes(candidates: typeof approvedCandidates) {
        return [...candidates].sort((a: any, b: any) => b.votes.length - a.votes.length);
    }


    function userSearchedConstituencyHandler(value: any) {
        setSpecificConstituency(value);
        setCurrentTable('searchedConstituency');
    }

    useEffect(() => {
        if (approvedCandidates.length === 0) {
            dispatch(getApprovedCandidates())
        }
        if (allConstituencies.length === 0) {
            dispatch(getAllConstituency());
        }
    }, [allConstituencies, dispatch]);

    useEffect(() => {
        if (!status) {
            dispatch(getElectionSession())
        }
        if (userConstituency === 'provincial assembly') {
            dispatch(allProvincialConstituencies());
        }
    }, [userConstituency, dispatch]);

    const handleSearchCandidates = useCallback(() => {
        if (specificConstituency) {
            dispatch(searchCandidatesOffConstituency({ constituency: specificConstituency }));
        }
    }, [specificConstituency, dispatch]);

    useEffect(() => {
        handleSearchCandidates();
    }, [handleSearchCandidates]);

    return (
        <Stack overflow={'scroll'} flexGrow={1}>
            <PageHeader
                title='Results'
                subtitle={status === 'ended' ? "Final results are listed below." : 'Live results are listed below.'}
                action={null}>

                <Stack direction={'row'} justifyContent={'end'} gap={1}>
                    <Button
                        variant={currentTable === 'all' ? 'contained' : 'outlined'}
                        onClick={() => setCurrentTable('all')}
                    >
                        All Candidates
                    </Button>
                    <TextField
                        label={'Choose an Assembly'}
                        placeholder='National Assembly'
                        variant='filled'
                        select
                        onChange={e => setUserConstituency(e.target.value)}
                        sx={{ minWidth: 300, maxWidth: 400 }}
                    >
                        <MenuItem value='national assembly'>National Assembly</MenuItem>
                        <MenuItem value='provincial assembly'>Provincial Assembly</MenuItem>
                    </TextField>
                    {/* {userConstituency && ( */}
                    <Autocomplete
                        options={userConstituency === 'national assembly' ? allNationalConstituencies : allProvincial}
                        onChange={(event, value) => userSearchedConstituencyHandler(value)}
                        fullWidth
                        sx={{ maxWidth: 350 }}
                        renderInput={(params) => (
                            <TextField {...params} variant='filled' label='Constituency' />
                        )}
                    />
                </Stack>

                <RenderTableHead
                    labels={['#', 'Name', 'Votes', 'Assembly', 'Constituency', 'Affiliation']}
                >
                    <RenderTableData
                        action={null}
                        loading={loading}
                        tableData={currentTable === 'all' ? sortedCandidates : searchedCandidates}
                    />

                </RenderTableHead>
                {/* <TableFooter>
                    <TablePagination
                        component="div"
                        count={allCandidates.length}
                        page={page}
                        onPageChange={handlePageChange}
                        rowsPerPage={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        />
                </TableFooter> */}
            </PageHeader>
        </Stack>
    )
}

export default ElectionResults