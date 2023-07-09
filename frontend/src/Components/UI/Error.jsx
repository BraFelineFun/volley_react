import React from 'react';
import {Box, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import NotFound from "./NotFound";

const Error = ({error, setError}) => {
    const BasicError = () => {
        return (
            <Box sx={{
                bgcolor: 'error.main',
                py: 1,
                width: 1,
                color: 'error.contrastText',
                display: 'flex',
                justifyContent: 'center',
                borderRadius: 1
            }}>
                <Typography>
                    {error}
                </Typography>
                <CloseIcon onClick={() => setError('')}/>
            </Box>
        );
    };

    switch (error) {
        case 'Not found': {
            return <NotFound/>;
        }
        default: {
            return <BasicError/>;
        }
    }
};

export default Error;