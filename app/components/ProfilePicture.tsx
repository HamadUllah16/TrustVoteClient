import React, { LegacyRef, useRef, useState } from 'react'
import Image from 'next/image';
import imageToBase64 from './Utils/imageToBase64';
import { Button, IconButton, Stack, Typography } from '@mui/material';
import { Add, Upload } from '@mui/icons-material';

function ProfilePicture({ formik, currentPicture, fieldName }: { fieldName: string, currentPicture: string, formik: any }) {
    const [msg, setMsg] = useState('');
    const [pfpPreview, setPfpPreview] = useState(currentPicture ?? '');

    const ref = useRef<HTMLInputElement | null>(null);

    function handlePfpGrid() {
        if (ref.current) {
            ref.current.click();
        }
    }

    async function pfpHandler(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (file) {
            try {
                const supportedFormats = ["image/png", "image/jpeg"];
                if (!supportedFormats.includes(file.type)) {
                    setMsg("Unsupported format");
                    return;
                }
                if (file.size > 5 * 1024 * 1024) { // 5 MB limit
                    setMsg("Max file size is 5 MB");
                    return;
                }
                const url = URL.createObjectURL(file);
                // const imagePreview = await imageToBase64(file);
                setPfpPreview(url);
                formik.setFieldValue(fieldName, file);
                setMsg(''); // Clear any previous error messages
            } catch (error) {
                console.error("Error converting file to base64: ", error);
            }
        }
    }

    return (
        <Stack direction={'row'} alignItems="center">
            <Stack
                border={'1px solid'}
                bgcolor={'primary.contrastText'}
                borderColor={'secondary.200'}
                borderRadius={5}
                height={200}
                width={200}
                justifyContent={'center'}
                onClick={handlePfpGrid}
                position={'relative'}
                overflow={'hidden'}
                alignItems={'center'}
                sx={{ cursor: 'pointer' }}
            >
                {!pfpPreview ? (
                    <Stack
                        position={'absolute'}
                        width={'100%'}
                        height={'100%'}
                        alignItems={'center'}
                        justifyContent={'center'}
                    >
                        <IconButton sx={{ width: '100%', height: '100%' }}>
                            <Add sx={{ color: 'primary.main' }} />
                        </IconButton>
                    </Stack>
                ) : (
                    <Stack
                        width={'100%'}
                        height={'100%'}
                        position={'relative'}
                    >
                        <Image
                            src={pfpPreview}
                            alt='Profile picture'
                            layout="fill"
                            objectFit="cover"
                        />
                        <Stack
                            position={'absolute'}
                            width={'100%'}
                            height={'100%'}
                            justifyContent={'center'}
                            alignItems={'center'}
                            sx={{
                                opacity: 0,
                                bgcolor: '#1C1C1C90',
                                transition: 'opacity 0.3s',
                                ':hover': {
                                    opacity: 1
                                }
                            }}
                        >
                            <Button
                                variant='contained'
                                size='small'
                                sx={{
                                    width: 'fit-content'
                                }}
                            >
                                Change
                            </Button>
                        </Stack>
                    </Stack>
                )}
            </Stack>
            <input
                ref={ref}
                type='file'
                accept='image/png, image/jpeg'
                onChange={pfpHandler}
                style={{ display: 'none' }}
            />
            {msg && (
                <Typography color={'error'} sx={{ ml: 2 }}>
                    {msg}
                </Typography>
            )}
        </Stack>
    )
}

export default ProfilePicture;
