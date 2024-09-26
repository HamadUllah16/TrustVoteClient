import Sidebar from '@/app/components/Sidebar'
import { Box, Divider, Stack, Table, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import RenderCandidates from '@/app/components/Candidate/RenderCandidates';
import React from 'react'
import AdminRoutes from '@/app/components/AdminComponents/AdminRoutes';

function AllCandidatesPage() {
    return (
        <Stack
            direction={'row'}
            gap={3}
            flexGrow={1}
            px={'75px'}
        >
            <Sidebar>
                <AdminRoutes />
            </Sidebar>

            <Stack
                width={'100%'}
                my={'30px'}
                gap={2}
            >
                <Typography variant='h6'>Nominated Candidates</Typography>
                <Divider />
                <Box
                    border={'1px solid #DADADA'}
                    borderRadius={'10px'}
                    height={'50vh'}
                    overflow={'hidden'}
                >
                    <Table>
                        <TableHead sx={{ bgcolor: '#DADADA' }}>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Party Affiliation</TableCell>
                                <TableCell>Constituency Type</TableCell>
                                <TableCell>Gender</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>DOB</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>

                        {/* render nominated candidates */}
                        <RenderCandidates />
                    </Table>
                </Box>
            </Stack>
        </Stack >
    )
}

export default AllCandidatesPage