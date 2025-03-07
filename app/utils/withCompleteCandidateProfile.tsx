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
            if (!loading && !user.loading) {
                if (isAuthenticated && !user.userProfile.profileCompletion) {
                    router.push('/candidate/settings/update-profile');
                }
            }
        }, [loading, isAuthenticated, user.userProfile.profileCompletion]);

        if (loading || !isAuthenticated) {
            router.push('/candidate/login');
            return 'Loading...'
        }

        return <Component {...props} />;
    }
}

export default withCompleteCandidateProfile;
