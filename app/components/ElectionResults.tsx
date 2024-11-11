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
import { approvedCandidatesForResults, getApprovedCandidates } from '@/app/redux/features/candidateSlice'
import { getAllElectionSessions } from '../redux/features/electionSessionSlice'
import PageHeader from './PageHeader'
import RenderElectionResultsData from './RenderElectionResultsData'

function ElectionResults() {
    const [userAssembly, setUserAssembly] = useState<null | string>('');
    const [page, setPage] = useState(0);
    const [specificConstituency, setSpecificConstituency] = useState('');
    const [currentTable, setCurrentTable] = useState('all');
    const [currentElectionSession, setCurrentElectionSession] = useState('');
    const dispatch = useDispatch<AppDispatch>();

    const { allElectionSessions } = useSelector((state: RootState) => state.electionSession);
    const { resultCandidates } = useSelector((state: RootState) => state.candidate);
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

    const sortedCandidates = sortCandidatesByVotes(resultCandidates, userAssembly);
    const sortedSearchedCandidate = sortCandidatesByVotes(searchedCandidates, userAssembly)


    function sortCandidatesByVotes(
        candidates: typeof resultCandidates,
        userAssembly: string | null
    ) {
        // Filter candidates based on constituencyType
        const filteredCandidates = userAssembly
            ? candidates.filter(
                (candidate: any) =>
                    candidate.constituencyType === userAssembly
            )
            : candidates;

        // Sort the filtered candidates by the number of voters in votes[0]
        return [...filteredCandidates].sort(
            (a: any, b: any) =>
                (b?.votes[0]?.voters.length || 0) -
                (a?.votes[0]?.voters.length || 0)
        );
    }

    function resetFiltersHandler() {
        setSpecificConstituency('');
        setUserAssembly('');
        setCurrentTable('all');
    }

    function userSearchedConstituencyHandler(value: any) {
        setSpecificConstituency(value);
        setCurrentTable('searchedConstituency');
    }

    useEffect(() => {
        if (currentElectionSession !== '') {
            dispatch(approvedCandidatesForResults({ electionSessionId: currentElectionSession }));
        }
        if (userAssembly === 'national assembly') {
            dispatch(getAllConstituency());
        }
    }, [userAssembly, currentTable, currentElectionSession]);

    useEffect(() => {
        if (allElectionSessions.length === 0) {
            dispatch(getAllElectionSessions())
        }
        if (userAssembly === 'provincial assembly' && currentElectionSession !== '') {
            dispatch(allProvincialConstituencies());
        }
    }, [userAssembly, currentTable, currentElectionSession, dispatch]);

    const handleSearchCandidates = useCallback(() => {
        if (specificConstituency && currentElectionSession !== '') {
            dispatch(searchCandidatesOffConstituency({
                constituency: specificConstituency,
                electionSessionId: currentElectionSession
            }));
        }
    }, [specificConstituency, dispatch]);

    useEffect(() => {
        handleSearchCandidates();
    }, [handleSearchCandidates]);

    return (
        <Stack overflow={'scroll'} flexGrow={1}>
            <PageHeader
                title='Results'
                subtitle={'View and Filter candidates based on Assembly, and Constituency.'}
                action={null}>

                <Stack direction={'row'} justifyContent={'space-between'} gap={1}>

                    <Stack>
                        <TextField
                            select
                            variant='filled'
                            label='Election Session'
                            placeholder='Election Session XXXX'
                            onChange={(e) => setCurrentElectionSession(e.target.value)}
                            sx={{
                                width: 250
                            }}
                        >
                            {allElectionSessions.length > 0 ? allElectionSessions.map((eachElectionSession) => {
                                return (
                                    <MenuItem value={eachElectionSession._id}>{eachElectionSession.name} {eachElectionSession.status === 'active' ? 'active' : ''}</MenuItem>
                                )
                            })
                                :
                                <MenuItem disabled>No election session found</MenuItem>
                            }
                        </TextField>
                    </Stack>

                    {currentElectionSession &&

                        <Stack direction={'row'} gap={1} width={'100%'} justifyContent={'end'}>
                            <Button
                                variant={(userAssembly === '' && specificConstituency === '') ? 'contained' : 'outlined'}
                                onClick={resetFiltersHandler}
                            >
                                All Candidates
                            </Button>

                            <TextField
                                label={'Choose an Assembly'}
                                placeholder='National Assembly'
                                variant='filled'
                                select
                                onChange={e => setUserAssembly(e.target.value)}
                                value={userAssembly}
                                sx={{ minWidth: 300, maxWidth: 400 }}
                            >
                                <MenuItem value='national assembly'>National Assembly</MenuItem>
                                <MenuItem value='provincial assembly'>Provincial Assembly</MenuItem>
                            </TextField>
                            {/* {userAssembly && ( */}
                            <Autocomplete
                                options={userAssembly === 'national assembly' ? allNationalConstituencies : allProvincial}
                                onChange={(event, value) => userSearchedConstituencyHandler(value)}
                                fullWidth
                                sx={{ maxWidth: 350 }}
                                renderInput={(params) => (
                                    <TextField {...params} variant='filled' label='Constituency' />
                                )}
                            />
                        </Stack>
                    }
                </Stack>

                <RenderTableHead
                    labels={['#', 'Name', 'Votes', 'Assembly', 'Constituency', 'Affiliation']}
                >
                    <RenderElectionResultsData
                        action={null}
                        loading={loading}
                        tableData={currentTable === 'all' ? sortedCandidates : sortedSearchedCandidate}
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