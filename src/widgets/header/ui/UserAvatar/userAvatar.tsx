import React from 'react';
import {Avatar} from '@mui/material';
import configureAvatarSymbols from '../../utils/ConfigureAvatarSymbols';
import theme from '@app/theme';
import {useSelector} from 'react-redux';
import {RootReducer} from '@app/store';

const UserAvatar = ({color = theme.avatar}: {color?: string}) => {
  const user = localStorage.getItem('user')
  const {name = '', login = ''} = user ? JSON.parse(user) : {};
  const AvatarSymbols = configureAvatarSymbols(name, login)
  const picture = useSelector((state: RootReducer ) => state.userReducer?.user?.picture)

  return picture ? <UserImage url={picture}/> : (
      <Avatar sx={defaultAvatar(color)}>
        {AvatarSymbols}
      </Avatar>
  )
};

const UserImage = ({url}: {url: string}) => {
  return <Avatar sx={avatarStyles(url)}>
    <></>
  </Avatar>
}

const defaultAvatar = (color: string) => ({
  'border': `2px solid ${color}`,
  'background': 'transparent',
  'color': color,
  'width': 'inherit',
  'height': 'inherit',
})
const avatarStyles = (backgroundImage: string | undefined) => ({
  'width': 'inherit',
  'border': 'none',
  'height': 'inherit',
  'backgroundImage': `url(${backgroundImage})`,
  'backgroundSize': 'cover',
  'backgroundRepeat': 'no-repeat',
  'backgroundPosition': 'center',
})

export default UserAvatar;
