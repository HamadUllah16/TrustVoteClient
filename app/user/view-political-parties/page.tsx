'use client'
import Sidebar from '@/app/components/Sidebar'
import { Box, Button, Divider, IconButton, Stack, Table, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material'
import RenderCandidates from '@/app/components/Candidate/RenderCandidates';
import React, { useState } from 'react'
import AdminRoutes from '@/app/components/AdminComponents/AdminRoutes';
import { Add, Cancel } from '@mui/icons-material';
import Modal from '@/app/components/Modal';
import AddPoliticalParty from '@/app/components/AdminComponents/AddPoliticalParty';
import RenderPoliticalParties from '@/app/components/AdminComponents/RenderPoliticalParties';
import UserSidebarMenus from '@/app/components/UserComponents/UserSidebarMenus';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';

function AllPoliticalPartiesPage() {
    const [showAddPartyModal, setShowAddPartyModel] = useState(false);
    const { userProfile } = useSelector((state: RootState) => state.user)
    return (
        <Stack
            direction={'row'}
            gap={3}
            flexGrow={1}
            px={'75px'}
        >
            <Sidebar>
                <UserSidebarMenus />
            </Sidebar>

            <Stack
                flexGrow={1}
                my={'30px'}
                gap={2}
            >
                <Stack direction={'row'} gap={2} justifyContent={'space-between'}>
                    <Typography variant='h6'>Political Parties</Typography>

                    {userProfile.role === 'admin' &&
                        <IconButton onClick={() => setShowAddPartyModel(true)}>
                            <Add />
                        </IconButton>
                    }

                </Stack>
                <Divider />
                <Stack
                    border={'1px solid #DADADA'}
                    borderRadius={'10px'}
                    minHeight={'50vh'}
                    overflow={'hidden'}
                >
                    <Table>
                        <TableHead sx={{ bgcolor: '#DADADA' }}>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Abbreviation</TableCell>
                                <TableCell>Symbol</TableCell>
                                {userProfile.role === 'admin' &&
                                    <TableCell>Actions</TableCell>
                                }
                            </TableRow>
                        </TableHead>

                        {/* rendering political parties */}
                        <RenderPoliticalParties />

                    </Table>
                </Stack>
            </Stack>

            {showAddPartyModal &&
                <AddPoliticalParty display={showAddPartyModal} setDisplay={setShowAddPartyModel} />
            }

        </Stack >
    )
}

export default AllPoliticalPartiesPage