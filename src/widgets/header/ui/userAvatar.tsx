import React from 'react';
import {Avatar} from '@mui/material';
import configureAvatarSymbols from '../utils/ConfigureAvatarSymbols';
import theme from '@app/theme';

const UserAvatar = ({color = theme.avatar}: {color?: string}) => {
  const user = localStorage.getItem('user')
  const {picture = null, name = undefined, login = undefined} = user ? JSON.parse(user) : {};
  const AvatarSymbols = configureAvatarSymbols(name, login)

  return <Avatar sx={{
    border: `2px solid ${picture ? 'transparent' : color}`,
    background: 'transparent',
    color: color,
    width: 'inherit',
    height: 'inherit',
  }}>
    {picture ? <img src={picture} alt={'user avatar'}/> : AvatarSymbols}
  </Avatar>
};

export default UserAvatar;
