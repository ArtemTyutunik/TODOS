import React, {FC, ReactNode} from "react";
import {Avatar, Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, Tooltip, Typography,} from "@mui/material";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

import {useDispatch, useSelector} from "react-redux";
import {RootReducer} from "../../../app/store";
import {logOutUser} from "../../../pages/authorization/model";

type menuItem = {
    label: string,
    Icon: () => React.ReactElement,
    onClick: () => void
}

interface  customListProps {
    children: ReactNode[]
}

const CustomListItemButton:FC<customListProps> = ({children}) => {
    return <ListItemButton sx = {{padding: '15px', borderRadius: "5px"}} className={"str"}>
        {children}
    </ListItemButton>
}


export default function UserSettingsMenu() {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const {email} = useSelector((state: RootReducer) => state.userReducer.user.user);
    const dispatch = useDispatch();

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
            }
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
                   sx={{ mt: '45px'}}
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
                   <ListItem sx = {{padding: 0}}>
                           <Box width={'auto'}
                                display={"flex"}
                                padding = {"5px"}>
                               <CustomListItemButton>
                                   <Avatar sx={{
                                       border:' 2px solid #48833f',
                                       background: "transparent",
                                       color: '#48833f',
                                       marginRight: '30px'
                                   }}>
                                       A
                                   </Avatar>
                                   <Box>
                                       <Typography fontWeight = {'bold'}>
                                           {email}
                                       </Typography>
                                       <Typography>
                                           {email.replace('@gmail.com', '')}
                                       </Typography>
                                   </Box>
                               </CustomListItemButton>
                           </Box>
                   </ListItem>
                   <Divider/>
                   <List>
                       {menuItems.map(({label,Icon, onClick}) => (
                           <ListItem key={label} onClick={() => {
                               handleCloseUserMenu();
                               onClick()
                           }}>
                               <CustomListItemButton>
                                   <ListItemIcon>
                                       <Icon/>
                                   </ListItemIcon>
                                   <ListItemText primary={label}/>
                               </CustomListItemButton>
                           </ListItem>
                       ))}
                   </List>
               </Menu>
           </>
    );
}
