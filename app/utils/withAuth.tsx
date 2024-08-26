'use client'
import { AppDispatch, RootState } from "@/app/redux/store"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUserProfile, setShowLogin } from "../redux/features/userSlice"

export default function withAuth(Component: any) {
    return function WithAuthProps(props: any) {
        const dispatch = useDispatch<AppDispatch>();
        const { isAuthenticated } = useSelector((state: RootState) => state.auth)
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
            return null
        }
        return <Component {...props} />
    }
}