import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

import {RootReducer} from '@app/store';
import {logOutUser} from '@pages/authorization/store';
import DropdownMenu from '@shared/components/dropdownMenu';
import useAnchorElement from '@shared/hooks/useAnchorElement';

type menuItem = {
    label: string,
    Icon: () => React.ReactElement,
    onClick: () => void
}

const ListItemButtonStyles = {
  padding: '15px',
  borderRadius: '5px'};


export default function UserSettingsMenu() {
  const [anchorElUser, addAnchorEl, removeAnchorEl] = useAnchorElement(null);
  const {user} = useSelector((state: RootReducer) => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const menuItems: menuItem[] = [
    {
      label: 'settings',
      Icon: () => <SettingsIcon/>,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onClick: () => {},
    },
    {
      label: 'logout',
      Icon: () => <LogoutIcon/>,
      onClick: () => {
        // @ts-ignore
        dispatch(logOutUser());
        localStorage.removeItem('user');
        navigate('/');
      },
    }];

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    addAnchorEl(event.currentTarget);
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
          sx={{padding: {mobile: '0', tablet: '16px'}, marginRight: '3px'}}
          onClick={handleOpenUserMenu}>
          <AccountCircle/>
        </IconButton>
      </Tooltip>
      <DropdownMenu anchorEl={anchorElUser} handleClose={removeAnchorEl}>
        <ListItem sx = {{padding: 0}}>
          <Box width={'auto'}
            display={'flex'}
            padding = {'5px'}>
            <ListItemButton sx = {ListItemButtonStyles}>
              <Avatar sx={{
                border: `2px solid ${theme.avatar}`,
                background: 'transparent',
                color: theme.avatar,
                marginRight: '30px',
              }}>
                 A
              </Avatar>
              <Box>
                <Typography fontWeight={'bold'}>
                  {user?.login}
                </Typography>
                <Typography>
                  {user?.login.replace('@gmail.com', '')}
                </Typography>
              </Box>
            </ListItemButton>
          </Box>
        </ListItem>
        <Divider/>
        <List>
          {menuItems.map(({label, Icon, onClick}) => (
            <ListItem key={label} onClick={() => {
              onClick();
              removeAnchorEl();
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
