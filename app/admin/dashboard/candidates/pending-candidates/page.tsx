import Sidebar from '@/app/components/Sidebar'
import { Box, Divider, Stack, Table, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'
import AdminRoutes from '@/app/components/AdminComponents/AdminRoutes';
import RenderPendingCandidates from '@/app/components/Candidate/RenderPendingCandidates';
function PendingCandidatesPage() {
  return (
    <Stack
      direction={'row'}
      gap={3}
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
        <Typography variant='h6'>All Candidates</Typography>
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
                <TableCell>Status</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>DOB</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <RenderPendingCandidates />
          </Table>
        </Box>
      </Stack>
    </Stack >
  )
}

export default PendingCandidatesPage