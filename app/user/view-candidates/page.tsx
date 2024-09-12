'use client'
import React from 'react'
import { Typography, Stack, Divider, Table, TableHead, TableRow, TableCell, TableBody, Box } from "@mui/material";
import Sidebar from '@/app/components/Sidebar';
import UserSidebarMenus from '@/app/components/UserComponents/UserSidebarMenus';
import withAuth from '@/app/utils/withAuth';
import RenderCandidates from '@/app/components/RenderCandidates';

function ViewCandidatesPage() {
    return (
        <Stack direction={'row'} px={'75px'} py={'15px'} gap={4} flex={1}>
            <Sidebar>
                <UserSidebarMenus />
            </Sidebar>
            <Stack flex={1} gap={2} p={3} borderRadius={2} width={'100%'} bgcolor={'primary.contrastText'}>
                <Box>
                    <Typography variant='h4' fontWeight={'bold'} color={'secondary.main'}>
                        All Candidates
                    </Typography>
                    <Typography variant='h6' color={'secondary.main'}>
                        Listed below are the approved candidates
                    </Typography>
                </Box>

                <Divider />

                <Stack flex={1} overflow={'hidden'} borderRadius={2} border={'1px solid #DADADA'} pb={2}>
                    <Table>
                        <TableHead sx={{ bgcolor: 'primary.200' }}>
                            <TableRow>
                                <TableCell><Typography variant='body1' fontWeight={'bold'}> #</Typography></TableCell>
                                <TableCell><Typography variant='body1' fontWeight={'bold'}> Name</Typography></TableCell>
                                <TableCell><Typography variant='body1' fontWeight={'bold'}> Constituency Type</Typography></TableCell>
                                <TableCell><Typography variant='body1' fontWeight={'bold'}> Constituency</Typography></TableCell>
                                <TableCell><Typography variant='body1' fontWeight={'bold'}> Party Affiliation</Typography></TableCell>
                                <TableCell><Typography variant='body1' fontWeight={'bold'}> Manifesto</Typography></TableCell>
                            </TableRow>
                        </TableHead>


                        <TableBody>
                            {/* render all the candidates */}
                            <RenderCandidates />
                        </TableBody>
                    </Table>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default withAuth(ViewCandidatesPage)