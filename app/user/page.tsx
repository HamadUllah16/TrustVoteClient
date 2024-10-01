'use client'
import { Typography, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserProfile } from "../redux/features/userSlice";
import Loading from "../components/Loading";
import { AppDispatch, RootState } from "../redux/store";
import withAuth from "../utils/withAuth";
import CompleteProfile from "../components/CompleteProfile";
import UserSidebar from "../components/UserComponents/UserSidebar";
import MainWrapper from "../components/MainWrapper";

function UserHomePage() {
    const { firstName, profileCompletion } = useSelector((state: RootState) => state.user.userProfile);
    const [loading, setLoading] = useState(true); // Loading state to block rendering
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const token = localStorage.getItem('x_auth_token');
        if (token) {
            dispatch(getUserProfile())
                .then(() => setLoading(false)) // Set loading to false once the profile is fetched
                .catch(() => router.push('/user/login')); // In case of error, redirect to login
        } else {
            router.push('/user/login');
        }
    }, [dispatch, router, profileCompletion]);

    if (loading) {
        // Return a loading state or spinner while the auth check is happening
        return <Loading />;
    }

    return (
        <MainWrapper >

            <UserSidebar />

            <Stack
                flex={1}
                color={'primary.200'}
                py={2}
                alignItems={'center'}
                justifyContent={'center'}
            >
                <Typography>
                    Welcome to Trust Vote <span style={{ textDecoration: 'underline', fontWeight: 'bold' }}>{firstName}</span>
                </Typography>
                {!profileCompletion &&
                    (
                        <CompleteProfile />
                    )

                }
            </Stack>
        </MainWrapper>
    );
}


export default withAuth(UserHomePage);