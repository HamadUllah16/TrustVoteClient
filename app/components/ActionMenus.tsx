import React, { SetStateAction } from 'react'
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Typography } from '@mui/material';

const ITEM_HEIGHT = 48;

function ActionMenus(
    { options, handleAction, openCloseState, setOpenCloseState }: { options: string[], handleAction: any, openCloseState: HTMLElement | null, setOpenCloseState: React.Dispatch<SetStateAction<HTMLElement | null>> }) {
    const open = Boolean(openCloseState);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setOpenCloseState(event.currentTarget);
    };
    return (
        <>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={openCloseState}
                open={open}
                onClose={() => setOpenCloseState(null)}
                slotProps={{
                    paper: {
                        style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: '20ch',
                        },
                    },
                }}
            >
                {options.map((option) => (
                    <MenuItem
                        key={option}
                        sx={{ mx: 1, borderRadius: 1 }}
                        onClick={() => handleAction(option)}
                    >
                        <Typography color={'primary.100'}>
                            {option}
                        </Typography>
                    </MenuItem>
                ))}
            </Menu>
        </>
    )
}

export default ActionMenus