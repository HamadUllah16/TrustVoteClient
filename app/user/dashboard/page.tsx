'use client'
import { Typography, Stack } from "@mui/material";
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

function UserHomePage() {
    const { firstName, profileCompletion } = useSelector((state: RootState) => state.user.userProfile);
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const [loading, setLoading] = useState(true); // Loading state to block rendering
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const token = localStorage.getItem('x_auth_token');

        if (!token) {
            router.push('/user/login');
            return; // Stop further execution
        }

        if (!isAuthenticated) {
            dispatch(getUserProfile())
                .then(() => setLoading(false))
                .catch(() => {
                    setLoading(false);
                    router.push('/user/login'); // Redirect in case of error
                });
        }
    }, [dispatch, router]);

    if (loading && !isAuthenticated) {
        return <Loading />; // Show loading spinner while checking auth
    }

    if (!isAuthenticated) {
        router.push('/user/login');
        return null; // Avoid rendering anything until the redirect is complete
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