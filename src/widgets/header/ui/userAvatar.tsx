import React from 'react';
import {Avatar} from '@mui/material';
import configureAvatarSymbols from '../utils/ConfigureAvatarSymbols';
import theme from '@app/theme';

const UserAvatar = ({color = theme.avatar}: {color?: string}) => {
  const user = localStorage.getItem('user')
  const userAvatar = localStorage.getItem('userAvatar')
  const {name = undefined, login = undefined} = user ? JSON.parse(user) : {};
  const AvatarSymbols = configureAvatarSymbols(name, login)

  return <Avatar sx={{
    border: `2px solid ${userAvatar ? 'transparent' : color}`,
    background: 'transparent',
    color: color,
    width: 'inherit',
    height: 'inherit',
  }}>
    {userAvatar ? <img src={userAvatar} alt={'user avatar'}/> : AvatarSymbols}
  </Avatar>
};

export default UserAvatar;
