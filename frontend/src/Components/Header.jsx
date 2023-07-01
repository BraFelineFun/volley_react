import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import LogoName from "./LogoName";
import PageList from "./PageList";
import UserAvatarSmall from "./UserAvatarSmall";
import {Button, Typography} from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import LoginButton from "./LoginButton";

function ResponsiveAppBar() {
    const isAuth = true;
    const pages = ['Products', 'Pricing', 'Blog'];  // Общедоступные
                                                    // ЛК отдельно в аватаре


    return (
        <AppBar position="sticky">
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: {xs: 'row-reverse', md: 'row'},
                            gap: 2
                        }}
                    >
                        <LogoName/>
                        <PageList pages={pages}/>
                    </Box>


                    <Box sx={{ ml: 'auto', flexGrow: 0 }}>
                        {isAuth ?
                            <UserAvatarSmall/>
                        :
                            <Box>
                                <LoginButton/>
                            </Box>
                        }
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;