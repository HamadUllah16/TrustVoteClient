'use client'
import { AppDispatch, RootState } from "@/app/redux/store"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUserProfile, setShowLogin } from "../redux/features/userSlice"
import { Stack, Typography } from "@mui/material"

export default function withAuth(Component: any) {
    return function WithAuthProps(props: any) {
        const dispatch = useDispatch<AppDispatch>();
        const { isAuthenticated } = useSelector((state: RootState) => state.auth)
        const { role } = useSelector((state: RootState) => state.user.userProfile)
        useEffect(() => {
            const token = localStorage.getItem('x_auth_token');
            if (!isAuthenticated) {
                if (token) {
                    dispatch(getUserProfile())
                    return
                }
                // If no user data and no user in state, show modal
                dispatch(setShowLogin(true));
            }
        }, [isAuthenticated, dispatch]);

        if (!isAuthenticated) {
            dispatch(setShowLogin(true));
            return null
        }
        if (role !== 'voter') {
            return (
                <Stack bgcolor={'primary.contrastText'} p={2} borderRadius={2}>
                    <Typography variant="h4" textAlign={'center'}>
                        Unauthorized
                    </Typography>
                    <Typography variant="subtitle1">
                        You tried to access an unauthorized route.
                    </Typography>
                </Stack>
            )
        }
        return <Component {...props} />
    }
}