import React, {useRef} from 'react';
import {useDispatch} from 'react-redux';
import {Box} from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import {toast} from 'react-toastify';
import UserAvatar from '../UserAvatar/userAvatar';
import {WrongFileSizeNotification, LoadFileServerError} from '@shared/components/Notification';
import {errorOptions} from '@shared/components/Notification/constants';
import {setNewAvatar} from '@shared/api/services/user';
import {setUserPicture} from '@entities/user/model/store';

const AvatarPicker = () => {
  const filePickerElement = useRef<HTMLInputElement | null>(null)
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('user') ?? '{}')

  const onFilePick = (e: React.SyntheticEvent) => {
    e.stopPropagation()
    filePickerElement.current?.click()
  }

  const onFilePickerChange = async (e: React.ChangeEvent) => {
    const file = (e.target as HTMLInputElement)?.files![0]
    const MAX_SIZE = 1000000

    if ( file) {
      if (file.size <= MAX_SIZE) {
        try {
          const url = await setNewAvatar(file, user?.login)
          dispatch(setUserPicture(url));
          localStorage.setItem('user', JSON.stringify({...user, picture: url}))
        } catch (e) {
          toast.error(<LoadFileServerError/>, errorOptions)
        }
      } else {
        toast.error(<WrongFileSizeNotification/>, errorOptions)
      }
    }
  }

  return <Box sx={avatarWrapperStyles} onClick={onFilePick}>
    <UserAvatar/>
    <Box sx={editAvatarButton} className={'edit-avatar'}>
      <Box width={'fit-content'} margin={'10px auto 0'}>
        <PhotoCameraIcon sx={{color: '#fff', fontSize: '15px'}}/>
      </Box>
    </Box>
    <input type={'file'}
      accept={'image/*, .png, .svg, .jpg'}
      ref={filePickerElement}
      onChange={onFilePickerChange}
      className={'avatar-picker'}/>
  </Box>
};

const avatarWrapperStyles = {
  'width': '40px',
  'height': '40px',
  'mr': '15px',
  'position': 'relative',
  '&:hover': {
    '& .edit-avatar': {
      visibility: 'visible',
    },
  },
  '& .avatar-picker': {
    visibility: 'hidden',
  },
}

const editAvatarButton = {
  visibility: 'hidden',
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  bottom: 0,
  right: 0,
  top: 0,
  left: 0,
  borderRadius: '50%',
  background: 'rgba(0,0,0, 50%)',
}

export default AvatarPicker;
