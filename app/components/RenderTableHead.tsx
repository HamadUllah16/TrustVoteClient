import React from 'react'
import { Typography, Stack, Divider, Table, TableHead, TableRow, TableCell, TableBody, Box } from "@mui/material";

function RenderTableHead({ labels, children }: { labels: string[], children: React.ReactNode }) {
    return (

        <Stack
            flex={1}
            overflow={'scroll'}
            bgcolor={'background.default'}
            borderRadius={1}
            border={'1px solid'}
            borderColor={'secondary.200'}
            pb={2}
            maxHeight={800}
        >
            <Table>
                <TableHead sx={{ bgcolor: 'primary.main' }}>
                    <TableRow>
                        {labels.map((label: string, index: number) => {
                            return (
                                <TableCell
                                    key={index}
                                    sx={{ color: 'primary.100' }}
                                >
                                    <Typography
                                        variant='body1'
                                        fontWeight={'bold'}
                                    >
                                        {label}
                                    </Typography>
                                </TableCell>
                            )
                        })}
                    </TableRow>
                </TableHead>


                <TableBody>
                    {/* data rendering components*/}
                    {children}
                </TableBody>
            </Table>
        </Stack>
    )
}

export default RenderTableHead