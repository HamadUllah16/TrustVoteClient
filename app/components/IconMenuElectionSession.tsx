import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { modifyElectionSession } from '../redux/features/electionSessionSlice';
import toast from 'react-hot-toast';

const ITEM_HEIGHT = 48;

export default function LongMenu({ electionSession, options }: { options: string[], electionSession: any }) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch<AppDispatch>()
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleAction = (option: string) => {
        toast.promise(
            dispatch(modifyElectionSession(
                {
                    status: option === 'Resume' ? 'active' : option === 'End' ? 'ended' : 'paused', electionSessionPublicKey: electionSession.electionSessionPublicKey
                }
            )).unwrap(), {
            loading: 'Loading...',
            success: `Election Session ${option === 'Resume' ? 'Resumed' : option === 'End' ? 'Ended' : 'Paused'}`,
            error: 'Error changing Election Session status.'
        }
        )
        setAnchorEl(null)
    }

    return (
        <div>
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
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
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
        </div>
    );
}
