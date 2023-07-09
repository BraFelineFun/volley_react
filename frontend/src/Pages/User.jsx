import React from 'react';
import {Box} from "@mui/material";
import {useParams} from "react-router-dom";

const User = () => {
    const {id} = useParams();
    return (
        <Box>
            User #{id}
        </Box>
    );
};

export default User;