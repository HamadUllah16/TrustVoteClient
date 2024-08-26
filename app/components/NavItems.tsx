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
    const open = Boolean(anchorEl);
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const { isAuthenticated } = useSelector((state: RootState) => state.auth)
    return (
        <Box
            display={"flex"}
            gap={2}
        >
            {
                isAuthenticated ?
                    <>
                        <Link href={'/cast-a-vote'}>
                            <Button
                                variant='outlined'>
                                Cast Vote
                            </Button>
                        </Link>
                    </>

                    :
                    <>
                        <Link href={'/user/login'}>

                            <Button
                                variant='outlined'>
                                Login
                            </Button>
                        </Link>
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

                                <MenuItem onClick={handleClose} disableRipple>
                                    Voter
                                </MenuItem>
                            </Link>

                            <Link href={'/candidate/register'}>
                                <MenuItem onClick={handleClose} disableRipple>
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