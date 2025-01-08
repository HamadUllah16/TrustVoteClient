'use client'
import { AppDispatch, RootState } from "@/app/redux/store"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCandidateProfile } from "../redux/features/candidateSlice"
import CandidateLogin from "../components/Candidate/CandidateLogin"
import { useRouter } from "next/navigation"

export default function withCandidateAuth(Component: any) {
    return function WithAuthProps(props: any) {
        const dispatch = useDispatch<AppDispatch>();
        const { isAuthenticated } = useSelector((state: RootState) => state.auth);
        const [loading, setLoading] = useState(true)
        const { role } = useSelector((state: RootState) => state.user.userProfile);
        const router = useRouter();

        useEffect(() => {
            const token = localStorage.getItem('x_auth_token');
            if (!isAuthenticated && token) {
                dispatch(getCandidateProfile()); // Fetch candidate profile if token exists
            }
        }, [isAuthenticated, dispatch]);

        useEffect(() => {
            if (role !== 'candidate') {
                router.replace('/unauthorized')
            } else {
                setLoading(false)
            }
        }, [role, router])

        // Show a loading state while profile is being fetched
        if (isAuthenticated && role === 'candidate') {
            return <Component {...props} />;
        }

        // If not authenticated, show login
        if (!isAuthenticated) {
            return <CandidateLogin />;
        }

        // If authenticated, render the protected component
        return <div>Loading...</div>; // You can replace this with a spinner or skeleton loader
    }
}
