'use client';
import { Typography, Stack, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserProfile } from "../../redux/features/userSlice";
import Loading from "../../components/Loading";
import { AppDispatch, RootState } from "../../redux/store";
import withAuth from "../../utils/withAuth";
import CompleteProfile from "../../components/CompleteProfile";
import UserSidebar from "../../components/UserComponents/UserSidebar";
import MainWrapper from "../../components/MainWrapper";
import socket from '@/app/components/Utils/socket';

function UserHomePage() {
    const { firstName, profileCompletion, _id } = useSelector((state: RootState) => state.user.userProfile);
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    // Fetch user profile on component mount
    useEffect(() => {
        const token = localStorage.getItem('x_auth_token');

        if (!token) {
            router.push('/user/login');
            return;
        }

        if (!isAuthenticated) {
            dispatch(getUserProfile())
                .then(() => setLoading(false))
                .catch(() => {
                    setLoading(false);
                    router.push('/user/login');
                });
        }
    }, [dispatch, router, isAuthenticated]);

    if (loading && !isAuthenticated) {
        return <Loading />;
    }

    if (!isAuthenticated) {
        router.push('/user/login');
        return null;
    }

    return (
        <MainWrapper>
            <UserSidebar />
            <Stack
                flex={1}
                color={'primary.200'}
                py={2}
                alignItems={'center'}
                justifyContent={'center'}
            >
                <Typography>
                    Welcome to Trust Vote{' '}
                    <span style={{ textDecoration: 'underline', fontWeight: 'bold' }}>
                        {firstName}
                    </span>
                </Typography>
                {!profileCompletion && <CompleteProfile />}
            </Stack>
        </MainWrapper>
    );
}

export default withAuth(UserHomePage);
