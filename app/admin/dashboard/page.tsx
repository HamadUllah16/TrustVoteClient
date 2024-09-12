import AdminRoutes from '@/app/components/AdminComponents/AdminRoutes'
import Sidebar from '@/app/components/Sidebar'
import { Stack } from '@mui/material'
import React from 'react'

function DashboardPage() {
    return (
        <Stack
            direction={'row'}
            gap={3}
        >
            <Sidebar>
                <AdminRoutes />
            </Sidebar>
        </Stack>
    )
}

export default DashboardPage