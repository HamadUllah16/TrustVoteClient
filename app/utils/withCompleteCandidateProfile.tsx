'use client'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { getCandidateProfile } from '../redux/features/candidateSlice';
import { useRouter } from 'next/navigation';

function withCompleteCandidateProfile(Component: any) {
    return function withCompleteProfileProps(props: any) {
        const { profileCompletion } = useSelector((state: RootState) => state.user.userProfile);
        const { isAuthenticated } = useSelector((state: RootState) => state.auth);
        const router = useRouter();
        const dispatch = useDispatch<AppDispatch>();
        useEffect(() => {
            const token = localStorage.getItem('x_auth_token');
            if (!isAuthenticated && token) {
                dispatch(getCandidateProfile());

                if (!profileCompletion) {
                    router.push('/candidate/complete-profile');
                }
            }
        }, [])

        if (!isAuthenticated) {
            return null
        }
        return <Component {...props} />
    }
}

export default withCompleteCandidateProfile