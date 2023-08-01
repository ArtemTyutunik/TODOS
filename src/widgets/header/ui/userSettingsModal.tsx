import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {
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
} from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LogoutIcon from '@mui/icons-material/Logout';

import {RootReducer} from '@shared/interfacesAndTypes';
import {logOutUser} from '@entities/user/model/store';
import DropdownMenu from '@shared/components/dropdownMenu';
import {useAnchorElement} from '@shared/hooks';
import UserAvatar from './UserAvatar/userAvatar';
import AvatarPicker from './AvatarPicker/AvatarPicker';
import {SwitchComponent} from '@shared/components/SwitchComponent';
import {themeModeSelector, toggleMode} from '@app/store/AppStore';

type menuItem = {
    label: React.ReactNode,
    Icon: () => React.ReactElement,
    onClick: () => void
}

const ListItemButtonStyles = {
  'padding': '10px',
  'borderRadius': '5px',
};


export default function UserSettingsMenu() {
  const [anchorElUser, addAnchorEl, removeAnchorEl] = useAnchorElement(null);
  const mode = useSelector(themeModeSelector)
  const {user} = useSelector((state: RootReducer) => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menuItems: menuItem[] = [
    {
      label: 'logout',
      Icon: () => <LogoutIcon/>,
      onClick: () => {
        dispatch(logOutUser());
        localStorage.removeItem('user');
        localStorage.removeItem('inboxID');
        localStorage.removeItem('verified');
        navigate('/');
      },
    }];

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    addAnchorEl(event.currentTarget);
  };

  const onDarkModeChange = () => {
    const newValue = mode === 'dark' ? 'light' : 'dark';
    dispatch(toggleMode(newValue));
    localStorage.setItem('mode', newValue);
  }

  return (
    <>
      <Tooltip title="Open settings">
        <IconButton
          size="large"
          edge="end"
          aria-label="account of current user"
          aria-haspopup="true"
          color="inherit"
          sx={{padding: {mobile: '0', tablet: '5px'}, marginRight: '3px', ml: '15px'}}
          onClick={handleOpenUserMenu}>
          <Box width={'30px'} height={'30px'}>
            <UserAvatar color={'#ffffff'}/>
          </Box>
        </IconButton>
      </Tooltip>
      <DropdownMenu anchorEl={anchorElUser} handleClose={removeAnchorEl}>
        <ListItem sx={{padding: 0}}>
          <Box width={'auto'}
            display={'flex'}
            padding={'5px'}>
            <ListItemButton sx={ListItemButtonStyles}>
              <AvatarPicker/>
              <Box>
                <Typography fontWeight={'bold'}>
                  {user?.login}
                </Typography>
                <Typography>
                  {user?.name || user?.login.replace('@gmail.com', '')}
                </Typography>
              </Box>
            </ListItemButton>
          </Box>
        </ListItem>
        <Divider/>
        <List>
          {menuItems.map(({label, Icon, onClick}, index) => (
            <ListItem key={index} onClick={() => {
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
          <ListItem sx={{marginLeft: '10px', marginBottom: '10px'}}>
            <ListItemIcon>
              <DarkModeIcon/>
            </ListItemIcon>
            <Typography mr={'15px'}>
                Dark mode
            </Typography>
            <SwitchComponent checked={mode === 'dark'} onChange={onDarkModeChange}/>
          </ListItem>
        </List>
        <Divider/>
        <Typography textAlign={'center'} fontSize={'13px'} padding={'5px 0'} color={'#202020'}>
            v. 1.1.0 <span>&#183;</span> Designed by Artem Tyutyunik
        </Typography>
      </DropdownMenu>
    </>
  );
}
