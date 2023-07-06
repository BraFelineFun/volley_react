import React from 'react';
import {Card, CardActionArea, CardContent, CardMedia, Link} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const placeholder = 'https://placehold.co/500x500';

const TeamCardSmall = ({name, image = placeholder, leader = null, playerCount = 0}) => {
    return (
        <Card sx={{ bgcolor: 'primary.light' }} >
            <Box sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                flexDirection: {xs: 'column', md: 'row'}
            }}>
                <CardActionArea>
                    <CardMedia
                        component='img'
                        sx={{
                            height: 160,
                            width: {xs: '100%', md: 150},
                            color: 'primary.contrastText'
                        }}
                        image={(!!image)? process.env.REACT_APP_BASE_URL + image : placeholder}
                        alt='teamImage'
                    />
                </CardActionArea>
                <CardContent sx={{
                    p: 2,
                    width: 1,
                    color: 'primary.contrastText'
                }}
                >
                    <Typography sx={{fontWeight: 'bold'}} align='right' variant='h4'>
                        {name}
                    </Typography>
                    <Box
                        display='flex'
                        gap='12px'
                        flexWrap='wrap'
                    >

                        <Card
                            variant='outlined'
                            sx={{
                                bgcolor: 'primary.contrastText',
                                color: 'grey.800',
                                p:1
                            }}
                        >

                            <Typography sx={{fontWeight: 'bold'}} variant='subtitle1'>
                                Leader:
                            </Typography>
                            <Typography variant='body2'>
                                <Link to={'/'}>
                                    {leader?.name || '...'}
                                </Link>
                            </Typography>
                        </Card>

                        <Card
                            variant='outlined'
                            sx={{
                                bgcolor: 'primary.contrastText',
                                color: 'grey.800',
                                p:1
                            }}
                        >
                            <Typography sx={{fontWeight: 'bold'}} variant='subtitle1'>
                                Player Count:
                            </Typography>
                            <Typography variant='body2'>
                                {playerCount}
                            </Typography>
                        </Card>
                    </Box>
                </CardContent>

            </Box>
        </Card>
    );
};

export default TeamCardSmall;