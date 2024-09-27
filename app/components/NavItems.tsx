'use client'
import { Box, Button, MenuItem } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { StyledMenu } from '@/app/components/MenuButton';
import { KeyboardArrowDown } from '@mui/icons-material'

function NavItems() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorEl2, setAnchorEl2] = React.useState(null);
    const open = Boolean(anchorEl);
    const open2 = Boolean(anchorEl2);
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClick2 = (event: any) => {
        setAnchorEl2(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClose2 = () => {
        setAnchorEl2(null);
    };
    const { isAuthenticated } = useSelector((state: RootState) => state.auth)
    return (
        <Box
            display={"flex"}
            gap={2}
        >
            {
                !isAuthenticated &&
                <>
                    <Button
                        id="demo-customized-button"
                        aria-controls={open2 ? 'demo-customized-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open2 ? 'true' : undefined}
                        variant="contained"
                        disableElevation
                        onClick={handleClick2}
                        endIcon={<KeyboardArrowDown sx={{ rotate: open2 ? '180deg' : '0deg', transition: '0.3s all' }} />}
                    >
                        Login
                    </Button>
                    <StyledMenu
                        id="demo-customized-menu"
                        MenuListProps={{
                            'aria-labelledby': 'demo-customized-button',
                        }}
                        anchorEl={anchorEl2}
                        open={open2}
                        onClose={handleClose2}
                    >
                        <Link href={'/user/login'}>

                            <MenuItem sx={{ borderRadius: 1 }} onClick={handleClose2} disableRipple>
                                Voter
                            </MenuItem>
                        </Link>

                        <Link href={'/candidate/login'}>
                            <MenuItem sx={{ borderRadius: 1 }} onClick={handleClose2} disableRipple>
                                Candidate
                            </MenuItem>
                        </Link>
                    </StyledMenu>
                    {/* -------------------------------------------------------- */}
                    <Button
                        id="demo-customized-button"
                        aria-controls={open ? 'demo-customized-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        variant="contained"
                        disableElevation
                        onClick={handleClick}
                        endIcon={<KeyboardArrowDown sx={{ rotate: open ? '180deg' : '0deg', transition: '0.3s all' }} />}
                    >
                        Register
                    </Button>
                    <StyledMenu
                        id="demo-customized-menu"
                        MenuListProps={{
                            'aria-labelledby': 'demo-customized-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                        <Link href={'/user/register'}>

                            <MenuItem sx={{ borderRadius: 1 }} onClick={handleClose} disableRipple>
                                Voter
                            </MenuItem>
                        </Link>

                        <Link href={'/candidate/register'}>
                            <MenuItem sx={{ borderRadius: 1 }} onClick={handleClose} disableRipple>
                                Candidate
                            </MenuItem>
                        </Link>
                    </StyledMenu>
                </>
            }
        </Box>
    )
}

export default NavItems