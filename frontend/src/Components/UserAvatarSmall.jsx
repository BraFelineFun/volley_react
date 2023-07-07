import React from 'react';
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import {ListItemIcon, ListItemText, MenuItem, Menu, Avatar, Link, Typography} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import {useDispatch, useSelector} from "react-redux";
import {Link as RouterLink} from 'react-router-dom';

import {setDefaultUser, toggleAuth} from "../Store/slices/userSlice";
import {PROFILE_ROUTE} from "../utils/consts";

const UserAvatarSmall = () => {
    const settings = React.useMemo(()=> {
        return [
            {label: "Profile", to: PROFILE_ROUTE, icon: <PersonIcon/>},
        ]
    },[]);

    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const evalLogout = () => {
        dispatch(setDefaultUser());
        dispatch(toggleAuth());
        handleCloseUserMenu();
    }

    return (
        <>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar sx={{width: 56, height: 56}} alt={user.name} src={process.env.REACT_APP_BASE_URL + user.image} />
                </IconButton>
            </Tooltip>
            <Menu
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                {settings.map((setting) => (
                    <Link key={setting.label} component={RouterLink} to={setting.to} color='inherit' underline={'none'}>
                        <MenuItem  onClick={handleCloseUserMenu}>
                            <ListItemIcon>
                                {setting.icon}
                            </ListItemIcon>
                            <ListItemText>
                                {setting.label}
                            </ListItemText>
                        </MenuItem>
                    </Link>
                ))}
                <MenuItem onClick={evalLogout}>
                    <ListItemIcon>
                        <LogoutIcon/>
                    </ListItemIcon>
                    <ListItemText>
                        Logout
                    </ListItemText>
                </MenuItem>
            </Menu>

        </>
    );
};

export default UserAvatarSmall;