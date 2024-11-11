
import { Button, Grid, Box, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'
import { CloudCircle, Error, Info } from '@mui/icons-material'
import Image from 'next/image';
import imageToBase64 from './Utils/imageToBase64';
import { useSelector } from 'react-redux';


function NationalityVerification({ formik }) {
    const { cnicFront, cnicBack, profileCompletion } = useSelector((state) => state.user.userProfile)
    const [msg, setMsg] = useState('');
    const [cnicFrontPreview, setCnicFrontPreview] = useState('');
    const [cnicBackPreview, setCnicBackPreview] = useState('');

    const firstImageRef = useRef(null);
    const secondImageRef = useRef(null);

    function handleGridClick(ref) {
        if (ref.current !== null) {
            ref.current.click();
        }
    }

    const handleFileChange = async (event, fieldName, setFieldValue, setPreview) => {
        const file = event.currentTarget.files?.[0];
        if (file) {
            try {
                const supportedFormats = ["image/png", "image/jpeg"];
                if (!supportedFormats.includes(file.type)) {
                    setMsg("Unsupported format");
                    return;
                }
                if (file.size > 5 * 1024 * 1024) { // 5 MB
                    setMsg("Max file size is 5 MB");
                    return;
                }
                const imagePreview = await imageToBase64(file);
                setPreview(imagePreview)
                setFieldValue(fieldName, file);
            } catch (error) {
                console.error("Error converting file to base64: ", error);
            }
        }
    };
    return (
        <Grid
            display={"flex"}
            flexDirection={"column"}
            gap={2}
            border={"1px solid"}
            borderColor={'secondary.200'}
            bgcolor={'background.default'}
            p={2}
            maxWidth={"fit-content"}
            borderRadius={2}
        >
            <Box>
                <Typography sx={{ display: "flex", alignItems: "center", gap: 0.5 }} variant='body2' color={"#5A5A5A"}><Info fontSize='' /> Support documents: CNIC</Typography>
                <Typography sx={{ display: "flex", alignItems: "center", gap: 0.5 }} variant='body2' color={"#5A5A5A"}><Info fontSize='' /> Support formats: PNG, JPG</Typography>
                <Typography sx={{ display: "flex", alignItems: "center", gap: 0.5 }} variant='body2' color={"#5A5A5A"}><Info fontSize='' /> Maximum size: 5mb</Typography>
            </Box>
            <Grid
                display={"flex"}
                gap={2}
            >
                {/* Front picture of the card */}
                <Grid
                    border={"1px solid"}
                    borderColor={'secondary.200'}
                    width={"250px"}
                    bgcolor={'secondary.main'}
                    maxWidth={"320px"}
                    height={"150px"}
                    maxHeight={"200px"}
                    overflow={"hidden"}
                    borderRadius={2}
                    p={1}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    onClick={() => handleGridClick(firstImageRef)}

                    sx={{
                        cursor: "pointer",
                        position: "relative",
                        ":hover .fileBtn": {
                            display: "flex"
                        }
                    }}
                >
                    {/* preview */}
                    {formik.values.cnicFront === "" ?
                        <Typography color={"#5A5A5A"} variant='body2'>Upload front picture of the ID</Typography>

                        :
                        <Image
                            src={cnicFront ?? cnicFrontPreview ?? ''}
                            alt='front of the card'
                            style={{
                                maxWidth: "100%",
                                maxHeight: "100%",
                                backgroundColor: "#D9D9D9",
                                borderRadius: '12px'

                            }}
                            width={300}
                            height={200}
                        />
                    }
                    <Box
                        className="fileBtn"
                        width={"100%"}
                        height={"100%"}
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        sx={{
                            position: "absolute",
                            zIndex: 1,
                            backgroundColor: "#5A5A5A40",
                            zIndex: 2,
                            display: "none"
                        }}
                    >
                        <Button
                            variant='contained'
                            size='small'
                        >
                            <CloudCircle />
                            Choose a file
                        </Button>


                    </Box>
                    <input name='cnicFront' type='file' ref={firstImageRef} onChange={(event) => handleFileChange(event, 'cnicFront', formik.setFieldValue, setCnicFrontPreview)} style={{ display: "none" }} />
                </Grid>

                {/* Back picture of the card */}
                <Grid
                    border={"1px solid"}
                    borderColor={'secondary.200'}
                    width={"250px"}
                    bgcolor={'secondary.main'}
                    maxWidth={"320px"}
                    height={"150px"}
                    maxHeight={"200px"}
                    overflow={"hidden"}
                    borderRadius={2}
                    p={1}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    onClick={() => handleGridClick(secondImageRef)}

                    sx={{
                        cursor: "pointer",
                        position: "relative",
                        ":hover .fileBtn": {
                            display: "flex"
                        }
                    }}
                >

                    {/* preview */}
                    {formik.values.cnicBack === "" ?
                        <Typography color={"#5A5A5A"} variant='body2'>Upload back picture of the ID</Typography>
                        :
                        <Image
                            src={cnicBack ?? cnicBackPreview ?? ''}
                            alt='back of the card'
                            style={{
                                maxWidth: "100%",
                                maxHeight: "100%",
                                backgroundColor: "#D9D9D9",
                                borderRadius: '12px'

                            }}
                            width={300}
                            height={200}
                        />
                    }
                    <Box
                        className="fileBtn"
                        width={"100%"}
                        height={"100%"}
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        sx={{
                            position: "absolute",
                            zIndex: 1,
                            backgroundColor: "#5A5A5A40",
                            zIndex: 2,
                            display: "none"
                        }}
                    >
                        <Button
                            variant='contained'
                            size='small'

                        >
                            <CloudCircle />
                            Choose a file
                        </Button>

                    </Box>
                    <input name='cnicBack' type='file' ref={secondImageRef} onChange={(event) => handleFileChange(event, 'cnicBack', formik.setFieldValue, setCnicBackPreview)} style={{ display: "none" }} />
                </Grid>
            </Grid>
            {
                msg === ""
                    ?
                    null
                    :
                    <Typography
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5
                        }}
                        variant='body2'
                        color={"error"}>
                        <Error fontSize="small" /> {msg}
                    </Typography>
            }
        </Grid>

    )
}

export default NationalityVerification