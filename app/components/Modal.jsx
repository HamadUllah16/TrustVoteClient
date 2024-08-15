import React from 'react'
import { Box, Grid } from "@mui/material";

function Modal({ children }) {
    return (
        <Grid
            position={"fixed"}
            top={0}
            left={0}
            width={"100%"}
            height={"100%"}
            zIndex={"1000"}
        >
            <Box
                position={"relative"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                width={"100%"}
                height={"100%"}
                sx={{
                    backgroundColor: "#DADADA50",
                }}
            >
                {children}
            </Box>
        </Grid>
    )
}

export default Modal