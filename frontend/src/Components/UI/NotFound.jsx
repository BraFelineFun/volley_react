import React from 'react';
import NotFoundImage from '../../resources/noResults.png';
import {Box, Paper, Typography} from "@mui/material";

const NotFound = () => {
    return (
        <Box component={Paper} elevation={3} sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: '300px',
            bgcolor: 'grey.300',
            p: 2
        }}>
            <Typography fontWeight={'bold'} variant={'subtitle1'}>
                Didn't find any results
            </Typography>
            <img src={NotFoundImage} alt="No results were found"/>
        </Box>
    );
};

export default NotFound;