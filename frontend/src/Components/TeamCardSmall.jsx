import React from 'react';
import {Card, CardActionArea, CardContent, CardMedia} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const TeamCardSmall = () => {
    return (
        <Card sx={{ bgcolor: 'primary.light' }} >
            <CardActionArea sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                flexDirection: {xs: 'column', md: 'row'}
            }}>
                <CardMedia
                    component='img'
                    sx={{
                        height: 160,
                        width: {xs: '100%', md: 150},
                        color: 'primary.contrastText'
                    }}
                    image='https://placehold.co/500x500'
                    alt='teamImage'
                />
                <CardContent sx={{
                    p: 2,
                    width: 1,
                    color: 'primary.contrastText'
                }}
                >
                    <Typography sx={{fontWeight: 'bold'}} align='right' variant='h4'>
                        TeamName
                    </Typography>
                    <Box
                        display='flex'
                        gap='12px'
                        flexWrap='wrap'
                    >

                        {['cell1', 'cell2', 'cell3', 'cell4', 'cell5'].map((cell) => (
                            <Card
                                variant='outlined'
                                key={cell}
                                sx={{
                                    bgcolor: 'primary.contrastText',
                                    color: 'grey.800',
                                    p:1
                                }}

                            >
                                <Typography sx={{fontWeight: 'bold'}} variant='subtitle1'>
                                    {cell}
                                </Typography>
                                <Typography variant='body2'>
                                    Cell body asdfasdf asd
                                </Typography>
                            </Card>
                            )
                        )}
                    </Box>
                </CardContent>

            </CardActionArea>
        </Card>
    );
};

export default TeamCardSmall;