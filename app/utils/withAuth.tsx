'use client'
import { AppDispatch, RootState } from "@/app/redux/store"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUserProfile, setShowLogin } from "../redux/features/userSlice"
import { getCandidateProfile } from "../redux/features/candidateSlice"
import { getAdminProfile } from "../redux/features/adminSlice"
import { usePathname, useRouter } from "next/navigation"
import Unauthorized from "../components/Unauthorized"

export default function withAuth(Component: any) {
    return function WithAuthProps(props: any) {
        const pathName = usePathname();
        const dispatch = useDispatch<AppDispatch>();
        const { isAuthenticated } = useSelector((state: RootState) => state.auth)
        const { userProfile } = useSelector((state: RootState) => state.user)
        const router = useRouter();

        useEffect(() => {
            const token = localStorage.getItem('x_auth_token');
            const role = localStorage.getItem('role');

            if (!isAuthenticated && token && userProfile.email === '') {
                // Only dispatch if profile is not already fetched
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
                // Redirect if token is missing
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
        }, [isAuthenticated, dispatch, userProfile]);

        // Avoid dispatch during rendering, only dispatch side-effects
        if (!isAuthenticated) {
            dispatch(setShowLogin(true));  // Ensure this dispatch happens only once and not during render
            return null; // Don't render anything if not authenticated
        }

        const roleBasedPaths = {
            admin: '/admin',
            voter: ['/user', '/home'],
            candidate: '/candidate',
        };

        // Role-based route checks
        if (userProfile.role === 'admin' && pathName.startsWith(roleBasedPaths.admin)) {
            return <Component {...props} />;
        }

        if (userProfile.role === 'voter' && roleBasedPaths.voter.some(path => pathName.startsWith(path))) {
            return <Component {...props} />;
        }

        if (userProfile.role === 'candidate' && pathName.startsWith(roleBasedPaths.candidate)) {
            return <Component {...props} />;
        }

        // If none of the conditions match, return unauthorized
        return <Unauthorized />;
    };
}
