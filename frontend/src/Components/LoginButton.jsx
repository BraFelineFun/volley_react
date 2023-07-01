import React from 'react';
import LoginIcon from "@mui/icons-material/Login";
import {Button, Typography} from "@mui/material";

const LoginButton = ({onClick, ...props}) => {
    return (
        <Button
            onClick={onClick}
            sx={{width: 1}}
            variant={'contained'}
            color={'secondary'}
        >
            <LoginIcon />
            <Typography variant={'subtitle1'} sx={{pl: 1, fontWeight:'bold'}}>
                Login
            </Typography>
        </Button>
    );
};

export default LoginButton;