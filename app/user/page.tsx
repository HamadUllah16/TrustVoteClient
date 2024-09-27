'use client'
import { Typography, Stack, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserProfile } from "../redux/features/userSlice";
import Sidebar from "../components/Sidebar";
import Loading from "../components/Loading";
import { AppDispatch, RootState } from "../redux/store";
import withAuth from "../utils/withAuth";
import UserSidebarMenus from "../components/UserComponents/UserSidebarMenus";
import CompleteProfile from "../components/CompleteProfile";

function UserHomePage() {
    const { firstName, profileCompletion } = useSelector((state: RootState) => state.user.userProfile);
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
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
        <Stack direction={'row'} px={'75px'} py={'15px'} gap={4} flex={1}>
            <Sidebar>
                <UserSidebarMenus />
            </Sidebar>
            <Stack flex={1} borderRadius={2} py={2} width={'100%'} alignItems={'center'} justifyContent={'center'} bgcolor={'secondary.main'} border={'1px solid'} borderColor={'secondary.200'}>
                <Typography>
                    Welcome to Trust Vote <span style={{ textDecoration: 'underline', fontWeight: 'bold' }}>{firstName}</span>
                </Typography>
                {!profileCompletion &&
                    (
                        <CompleteProfile />
                    )

                }
            </Stack>
        </Stack>
    );
}


export default withAuth(UserHomePage);