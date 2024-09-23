'use client'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { getCandidateProfile } from '../redux/features/candidateSlice';
import { useRouter } from 'next/navigation';

function withCompleteCandidateProfile(Component: any) {
    return function WithCompleteProfileProps(props: any) {
        const { user } = useSelector((state: RootState) => state);
        const { isAuthenticated, loading } = useSelector((state: RootState) => state.auth);
        const router = useRouter();
        const dispatch = useDispatch<AppDispatch>();

        useEffect(() => {
            const token = localStorage.getItem('x_auth_token');

            if (token && !isAuthenticated) {
                // If not authenticated but token exists, try fetching the profile
                dispatch(getCandidateProfile())
            }
        }, [isAuthenticated, dispatch]);

        useEffect(() => {
            if (!loading && isAuthenticated && !user.loading && !user.userProfile.profileCompletion) {
                // If not loading, authenticated, but profile is not complete, redirect
                router.push('/candidate/complete-profile');
            }
        }, [loading, isAuthenticated, user.userProfile.profileCompletion, router]);

        if (loading || !isAuthenticated) {
            return null; // Show nothing or a loading spinner while loading or not authenticated
        }

        return <Component {...props} />;
    }
}

export default withCompleteCandidateProfile;
