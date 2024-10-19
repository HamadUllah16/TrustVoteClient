import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

function RenderBallots() {
    const { userProfile } = useSelector((state: RootState) => state.user);
    return (
        ''
    )
}

export default RenderBallots