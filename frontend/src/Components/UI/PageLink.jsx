import React from 'react';
import {Link as RouterLink} from "react-router-dom";
import Typography from "@mui/material/Typography";
import {Link} from "@mui/material";

const PageLink = ({to, variant = 'body1', underline, children, ...props}) => {
    return (
        <Link
            to={to}
            component={RouterLink}
            color='inherit'
            underline={underline}
        >
            <Typography
                textTransform={'uppercase'}
                variant={variant}
                textAlign="center"
                overflow={'hidden'}
                textOverflow={'ellipsis'}
                {...props}
            >
                {children}
            </Typography>
        </Link>
    );
};

export default PageLink;