import React from 'react';
import {Card, Box,Typography, CardActionArea, CardContent, CardMedia} from "@mui/material";
import {useNavigate} from 'react-router-dom';
import PageLink from "./UI/PageLink";
import {TEAM_ROUTE, USER_ROUTE} from "../utils/consts";

const placeholder = 'https://placehold.co/500x500';

const TeamCard = ({id, name, image = placeholder, leader = null, playerCount = 0}) => {
    const navigate = useNavigate();
    return (
        <Card sx={{ bgcolor: 'primary.light' }} >
            <CardActionArea
                onClick={() => navigate(TEAM_ROUTE + '/' + id)}
                sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                flexDirection: {xs: 'column', md: 'row'}
            }}
            >
                <CardMedia
                    component='img'
                    sx={{
                        height: {xs: 160},
                        width: {xs: '100%', md: 150},
                        color: 'primary.contrastText'
                    }}
                    image={(!!image)? process.env.REACT_APP_BASE_URL + image : placeholder}
                    alt='teamImage'
                />
                <CardContent sx={{
                    p: 2,
                    pl: {sx: 2, md: 4},
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
                        mt={1}
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
                            <PageLink
                                {/*TODO: Переадресация перезагружает страницу*/}
                                onClick={(e) => {e.stopPropagation()}}
                                to={
                                    leader?.id?
                                        `${USER_ROUTE}/${leader.id}`:
                                        '/'
                            }>
                                {leader?.name || '...'}
                            </PageLink>
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
            </CardActionArea>
        </Card>
    );
};

export default TeamCard;