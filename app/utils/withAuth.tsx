'use client'
import { AppDispatch, RootState } from "@/app/redux/store"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUserProfile, setShowLogin } from "../redux/features/userSlice"
import { getCandidateProfile } from "../redux/features/candidateSlice"
import { getAdminProfile } from "../redux/features/adminSlice"
import { usePathname, useRouter } from "next/navigation"
import Unauthorized from "../components/Unauthorized"
import Loading from "../components/Loading"

export default function withAuth(Component: any) {
    return function WithAuthProps(props: any) {
        const pathName = usePathname();
        const dispatch = useDispatch<AppDispatch>();
        const { isAuthenticated } = useSelector((state: RootState) => state.auth)
        const { userProfile, loading } = useSelector((state: RootState) => state.user)
        const router = useRouter();

        useEffect(() => {
            const token = localStorage.getItem('x_auth_token');
            const role = localStorage.getItem('role');

            if (!isAuthenticated && token && userProfile.email === '') {
                switch (role) {
                    case 'voter':
                        dispatch(getUserProfile());
                        break;
                    case 'candidate':
                        dispatch(getCandidateProfile());
                        break;
                    case 'admin':
                        dispatch(getAdminProfile());
                        break;
                    default:
                        break;
                }
            }
            else if (isAuthenticated && token && userProfile.email === "") {
                switch (role) {
                    case 'voter':
                        dispatch(getUserProfile());
                        break;
                    case 'candidate':
                        dispatch(getCandidateProfile());
                        break;
                    case 'admin':
                        dispatch(getAdminProfile());
                        break;
                    default:
                        break;
                }

            } else if (!token) {
                // if token is missing
                switch (role) {
                    case 'voter':
                        router.push('/user/login');
                        break;
                    case 'candidate':
                        router.push('/candidate/login');
                        break;
                    case 'admin':
                        router.push('/admin/login');
                        break;
                    default:
                        router.push('/login');
                        break;
                }
            }
        }, [isAuthenticated, dispatch, userProfile.role]);


        if (!isAuthenticated) {
            dispatch(setShowLogin(true));
            return null;
        }

        const roleBasedPaths = {
            admin: '/admin',
            voter: '/user',
            candidate: '/candidate',
        };

        if (loading) {
            return <Loading />
        }
        if (userProfile.role === 'admin' && pathName.startsWith(roleBasedPaths.admin)) {
            return <Component {...props} />;
        }

        if (userProfile.role === 'voter' && pathName.startsWith(roleBasedPaths.voter)) {
            return <Component {...props} />;
        }

        if (userProfile.role === 'candidate' && pathName.startsWith(roleBasedPaths.candidate)) {
            return <Component {...props} />;
        }
        // else (
        //     // If none of the conditions match, return unauthorized
        //     router.push('/unauthorized')
        //     // return <Unauthorized />;
        // )
    };
}
