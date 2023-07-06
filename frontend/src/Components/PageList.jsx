import React from 'react';
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {Link} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import PageLink from "./PageLink";


const PageList = ({pages}) => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    return (
        <>
            {/* smallSize+ */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                    sx={{p: 0}}
                    size="large"
                    aria-label="page list"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                >
                    <MenuIcon/>
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                    }}
                >
                    {pages.map((page) => (
                        <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                            <PageLink to={page.to} >
                                {page.label}
                            </PageLink>
                        </MenuItem>
                    ))}
                </Menu>
            </Box>

            {/* midSize+ */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                    <Button
                        key={page.label}
                        sx={{color: 'white', display: 'block' }}
                    >
                        <PageLink to={page.to} >
                            {page.label}
                        </PageLink>
                    </Button>
                ))}
            </Box>
        </>
    );
};

export default PageList;