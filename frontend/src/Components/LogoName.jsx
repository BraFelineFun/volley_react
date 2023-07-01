import React from 'react';
import Box from "@mui/material/Box";
import SportsVolleyballIcon from '@mui/icons-material/SportsVolleyball';
import Typography from "@mui/material/Typography";
import {Card, CardActionArea} from "@mui/material";


const LogoName = () => {
    return (
        <Card
            sx={{
                my: 1,
                bgcolor: 'background.paper',
                borderRadius: 2
            }}
        >
            <CardActionArea
                component="a"
                href="/"
                sx={{
                    p: 2,
                }}
            >
                <Box
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                >
                    <SportsVolleyballIcon sx={{mr: 1, color: 'grey.800', fontSize: '30px'}}/>
                    <Typography
                        variant="h5"
                        noWrap
                        sx={{
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.1rem',
                            color: 'grey.800',
                            textDecoration: 'none',
                        }}
                    >
                        VOLLEY
                    </Typography>
                </Box>
            </CardActionArea>
        </Card>
    );
};

export default LogoName;