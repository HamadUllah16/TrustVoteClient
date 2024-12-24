'use client'
import React from 'react'
import { Skeleton, Stack, TableCell, TablePagination, TableRow, Typography } from '@mui/material'
import Image from 'next/image'
import Modal from './Modal'

function RenderConstituencyData({ tableData, loading, action }: { action: React.ReactNode | null, tableData: any, loading: boolean }) {
    return (
        <>
            {tableData && Object.keys(tableData).length > 0 ?
                tableData.constituencies.map((constituency: { area: string, constituency: string }, index: number) => {
                    return (
                        <TableRow key={tableData._id}>
                            <TableCell sx={{ color: 'secondary.100' }}>{loading ? <Skeleton sx={{ bgcolor: 'secondary.100' }} /> : index + 1}</TableCell>

                            <TableCell sx={{ color: 'secondary.100' }}>{loading ? <Skeleton sx={{ bgcolor: 'secondary.100' }} /> : constituency.constituency}</TableCell>
                            <TableCell sx={{ color: 'secondary.100' }}>{loading ? <Skeleton sx={{ bgcolor: 'secondary.100' }} /> : constituency.area}</TableCell>

                            <TableCell sx={{ color: 'secondary.100', textTransform: 'capitalize' }}>{loading ? <Skeleton sx={{ bgcolor: 'secondary.100' }} /> : tableData.province}</TableCell>
                            {action}
                        </TableRow>
                    )
                })
                :
                <TableRow>
                    <TableCell colSpan={8} align="center">No data available</TableCell>
                </TableRow>
            }
        </>
    )
}

export default RenderConstituencyData