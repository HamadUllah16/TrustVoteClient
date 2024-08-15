'use client'
import { Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import { useEffect } from "react";
import { getUserProfile } from "./redux/features/userSlice";

export default function Home() {
  const { firstName } = useSelector((state: RootState) => state.user.userProfile)
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getUserProfile());
  }, [firstName])
  return (
    <Grid
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      flexDirection={'column'}
    >
      <Typography>Welcome to Trust Vote <span style={{ textDecoration: 'underline', fontWeight: 'bold' }}>{firstName}</span></Typography>
    </Grid>
  );
}
