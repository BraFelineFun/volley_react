import React from 'react';
import {Box, Avatar, Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import {USER_ROUTE} from "../utils/consts";
import {useNavigate} from "react-router-dom";

const UserCard = ({id, name, email='', image}) => {
    const navigate = useNavigate();

    return (
        <Card
            sx={{
                width: 1,
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
            }}
            variant='elevation'
        >
            {!!id?
                <CardActionArea
                    onClick={() => navigate(USER_ROUTE + '/' + id)}
                    sx={{display: 'flex', p: 1, justifyContent: 'flex-start'}}
                >
                    <CardMedia>
                        <Avatar
                            sx={{width: 56, height: 56}}
                            alt={name}
                            src={image? process.env.REACT_APP_BASE_URL + image: ''}
                        />
                    </CardMedia>
                    <CardContent>
                        <Typography fontWeight='bold'>
                            {name}
                        </Typography>
                        <Typography>
                            email: {email}
                        </Typography>
                    </CardContent>
                </CardActionArea>

                :
                <Box p={3}>
                    Nothing here yet
                </Box>
            }
        </Card>
    );
};

export default UserCard;