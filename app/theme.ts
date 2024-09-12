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
        subtitle1: { fontSize: '18px' }
    },
    palette: {
        mode: 'light',
        primary: {
            main: '#404a56',
            "100": '#ffca43',
            '200': '#f2f2f2',
            contrastText: 'white',
        },
        secondary: {
            main: '#404a56',
            '100': '#ebecf0',
        },
        background: {
            default: '#f2f3f7'
        },
    },
    shape: {
        borderRadius: 10,
    },
});

export default theme;