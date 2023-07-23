import React, {useRef, useState} from 'react';
import UserAvatar from './userAvatar';
import {Box} from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';


const AvatarPicker = () => {
  const filePickerElement = useRef<HTMLInputElement | null>(null)
  const [, setSelectedFile] = useState<null | File>(null)

  const onFilePick = (e: React.SyntheticEvent) => {
    e.stopPropagation()
    //filePickerElement.current?.click()
  }

  const onFilePickerChange = (e: React.ChangeEvent) => {
    const file = (e.target as HTMLInputElement)?.files![0]

    if ( file) {
      setSelectedFile(file)
    }
  }

  return <Box sx={avatarWrapperStyles} onClick={onFilePick}>
    <UserAvatar/>
    <Box sx={editAvatarButton}>
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
