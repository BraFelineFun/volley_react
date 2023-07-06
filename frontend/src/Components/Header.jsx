import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import LogoName from "./LogoName";
import PageList from "./PageList";
import UserAvatarSmall from "./UserAvatarSmall";
import {Link, Typography} from "@mui/material";
import {Link as RouterLink} from 'react-router-dom';
import LoginButton from "./LoginButton";
import {useSelector} from "react-redux";

function ResponsiveAppBar() {
    const user = useSelector(state => state.user);
    const pages = [
        {
            label: 'Teams',
            to: '/teams'
        },
        {
            label: 'Contacts',
            to: '/'
        }
    ];


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
                        {user.isAuthed ?
                            <UserAvatarSmall/>
                        :
                            <Box>
                                <Link component={RouterLink} to={'/login'}>
                                    <LoginButton/>
                                </Link>
                            </Box>
                        }
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;