import React from 'react';
import {Link as RouterLink} from "react-router-dom";
import Typography from "@mui/material/Typography";
import {Link} from "@mui/material";

const PageLink = ({to, variant = 'body1', children}) => {
    return (
        <Link
            to={to}
            component={RouterLink}
            color='inherit'
            underline={'none'}
        >
            <Typography
                textTransform={'uppercase'}
                variant={variant}
                textAlign="center"
            >
                {children}
            </Typography>
        </Link>
    );
};

export default PageLink;