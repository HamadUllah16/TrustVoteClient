'use client'
import React from 'react'
import { Skeleton, TableCell, TableRow } from '@mui/material'
import Image from 'next/image'
import Modal from './Modal'

function RenderTableData({ tableData, loading, action }: { action: React.ReactNode | null, tableData: any, loading: boolean }) {
    return (
        <>
            {tableData &&
                tableData.map((data: any, index: number) => {
                    return (
                        <TableRow key={data._id}>
                            <TableCell sx={{ color: 'secondary.100' }}>{loading ? <Skeleton sx={{ bgcolor: 'secondary.100' }} /> : index + 1}</TableCell>
                            <TableCell sx={{ color: 'secondary.100' }}>{loading ? <Skeleton sx={{ bgcolor: 'secondary.100' }} /> : `${data.firstName}  ${data.lastName}`}</TableCell>
                            <TableCell sx={{ textTransform: 'capitalize', color: 'secondary.100' }}>{loading ? <Skeleton sx={{ bgcolor: 'secondary.100' }} /> : data.constituencyType}</TableCell>
                            <TableCell sx={{ color: 'secondary.100' }}>{loading ? <Skeleton sx={{ bgcolor: 'secondary.100' }} /> : data.constituency}</TableCell>
                            <TableCell sx={{ color: 'secondary.100' }}>{loading ? <Skeleton sx={{ bgcolor: 'secondary.100' }} /> : data.partyAffiliation}</TableCell>
                            {/* <TableCell sx={{ color: 'secondary.100' }}>{loading ? <Skeleton sx={{ bgcolor: 'secondary.100' }} /> : <Image src={data.manifesto ? data.manifesto : ''} width={50} height={50} alt='candidate maniesto' />}</TableCell> */}
                            {action}
                            {/* <Modal> */}
                            {/* <TableCell><object data={data.manifesto} type='application/pdf'>PDF: {data.manifesto}</object>{data.educationalCertificates}</TableCell> */}
                            {/* </Modal> */}
                        </TableRow>

                    )
                })
            }
        </>
    )
}

export default RenderTableData