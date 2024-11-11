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
import ActionMenus from './ActionMenus';



export default function LongMenu({ electionSession, options }: { options: string[], electionSession: any }) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const dispatch = useDispatch<AppDispatch>()

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
        <ActionMenus
            handleAction={handleAction}
            options={options}
            openCloseState={anchorEl}
            setOpenCloseState={setAnchorEl}
        />
    );
}
