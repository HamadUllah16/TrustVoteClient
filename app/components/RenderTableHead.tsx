import React from 'react'
import { Typography, Stack, Divider, Table, TableHead, TableRow, TableCell, TableBody, Box } from "@mui/material";

function RenderTableHead({ title, subtitle, labels, action, children }: { action: React.ReactNode | null, title: string, subtitle: string | null, labels: string[], children: React.ReactNode }) {
    return (
        <>
            <Stack
                flex={1}
                gap={2}
                py={3}
                divider={<Divider sx={{ bgcolor: 'secondary.200' }} />}
            >
                <Box>
                    <Stack direction={'row'} gap={1} justifyContent={'space-between'}>

                        <Typography variant='h4' fontWeight={'bold'} color={'primary.main'}>
                            {title}
                        </Typography>

                        {action}
                    </Stack>
                    <Typography variant='h6' color={'primary.100'}>
                        {subtitle}
                    </Typography>
                </Box>

                <Stack flex={1} overflow={'hidden'} bgcolor={'background.default'} borderRadius={1} border={'1px solid'} borderColor={'secondary.200'} pb={2}>
                    <Table>
                        <TableHead sx={{ bgcolor: 'primary.main' }}>
                            <TableRow>
                                {labels.map((label: string, index: number) => {
                                    return (
                                        <TableCell key={index} sx={{ color: 'primary.100' }} ><Typography variant='body1' fontWeight={'bold'}>{label}</Typography></TableCell>
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
            </Stack>
        </>
    )
}

export default RenderTableHead