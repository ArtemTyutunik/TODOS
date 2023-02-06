import React from "react";
import {Avatar, Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip, Typography,} from "@mui/material";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

import {useDispatch, useSelector} from "react-redux";
import {RootReducer} from "../../../app/store";
import {logOutUser} from "../../../pages/authorization/store";
import DropdownMenu from "../../../shared/components/dropdownMenu";
import {useNavigate} from "react-router-dom";

type menuItem = {
    label: string,
    Icon: () => React.ReactElement,
    onClick: () => void
}

const ListItemButtonStyles =  {
    padding: '15px',
    borderRadius: "5px"}



export default function UserSettingsMenu() {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const {user, firstLogin} = useSelector((state: RootReducer) => state.userReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const  menuItems: menuItem[] = [
        {
            label: 'settings',
            Icon: () => <SettingsIcon/>,
            onClick: () => {}
        },
        {
            label: 'theme',
            Icon: () => <DarkModeIcon/>,
            onClick: () => {}
        },

        {
            label: 'logout',
            Icon: () => <LogoutIcon/>,
            onClick: () => {
                dispatch(logOutUser());
                localStorage.removeItem('user')
                navigate('/')
            }
        }]

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const email = firstLogin? user.email: user.user.email;

    return (
           <>
               <Tooltip title="Open settings">
                   <IconButton
                       size="large"
                       edge="end"
                       aria-label="account of current user"
                       aria-haspopup="true"
                       color="inherit"
                       onClick={handleOpenUserMenu}>
                       <AccountCircle/>
                   </IconButton>
               </Tooltip>
               <DropdownMenu anchorEl={anchorElUser} handleClose={() => handleCloseUserMenu()}>
                   <ListItem sx = {{padding: 0}}>
                           <Box width={'auto'}
                                display={"flex"}
                                padding = {"5px"}>
                               <ListItemButton sx = {ListItemButtonStyles}>
                                   <Avatar sx={{
                                       border:' 2px solid #48833f',
                                       background: "transparent",
                                       color: '#48833f',
                                       marginRight: '30px'
                                   }}>
                                       A
                                   </Avatar>
                                   <Box>
                                       <Typography fontWeight={'bold'}>
                                           {email}
                                       </Typography>
                                       <Typography>
                                           {email.replace('@gmail.com', '')}
                                       </Typography>
                                   </Box>
                               </ListItemButton>
                           </Box>
                   </ListItem>
                   <Divider/>
                   <List>
                       {menuItems.map(({label,Icon, onClick}) => (
                           <ListItem key={label} onClick={() => {
                               handleCloseUserMenu();
                               onClick()
                           }}>
                               <ListItemButton sx={ListItemButtonStyles}>
                                   <ListItemIcon>
                                       <Icon/>
                                   </ListItemIcon>
                                   <ListItemText primary={label}/>
                               </ListItemButton>
                           </ListItem>
                       ))}
                   </List>
               </DropdownMenu>
           </>
    );
}
