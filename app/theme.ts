'use client'
import { createTheme } from "@mui/material/styles";
import { Inter } from "next/font/google";

const inter = Inter({
    weight: ["300", "400", "500", "700"],
    subsets: ["latin"],
    display: "swap",
});

const theme = createTheme({
    typography: {
        fontFamily: inter.style.fontFamily,
    },
    palette: {
        mode: 'light',
        primary: {
            main: '#3b3b3b',
        },
        secondary: {
            main: '#b9b9b9',
        },
    },
    shape: {
        borderRadius: 0,
    },
});

export default theme;