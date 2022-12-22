import React from "react";
import {IconButton, List, ListItem, ListItemButton,  ListItemIcon,  ListItemText,  Menu,  Tooltip,} from "@mui/material";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

type menuItem = {
    label: string,
    Icon: () => React.ReactElement
}

export default function UserSettingsMenu() {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const  menuItems: menuItem[] = [
        {
            label: 'settings',
            Icon: () => <SettingsIcon/>
        },
        {
            label: 'theme',
            Icon: () => <DarkModeIcon/>
        },

        {
            label: 'logout',
            Icon: () => <LogoutIcon/>
        }]

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
           <>
               <Tooltip title="Open settings">
                   <IconButton
                       size="large"
                       edge="end"
                       aria-label="account of current user"
                       aria-haspopup="true"
                       color="inherit"
                       onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                       <AccountCircle/>
                   </IconButton>
               </Tooltip>
               <Menu
                   sx={{ mt: '45px' }}
                   id="menu-appbar"
                   anchorEl={anchorElUser}
                   anchorOrigin={{
                       vertical: 'top',
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
                   <List>
                       {menuItems.map(({label,Icon}) => (
                           <ListItem key={label} onClick={handleCloseUserMenu}>
                               <ListItemButton>
                                   <ListItemIcon>
                                       <Icon/>
                                   </ListItemIcon>
                                   <ListItemText primary={label}/>
                               </ListItemButton>
                           </ListItem>
                       ))}
                   </List>

               </Menu>
           </>
    );
}
