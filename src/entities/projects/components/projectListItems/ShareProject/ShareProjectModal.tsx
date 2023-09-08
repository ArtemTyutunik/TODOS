import React from 'react';
import {Box, Button, TextField, Typography} from '@mui/material';
import CustomIconButton from '@shared/components/CustomIconButton';
import {CloseIcon} from '@shared/components/icons';
import BasicModal from '@shared/components/modal';
import {styled} from '@mui/material/styles';
import {IProject} from '@shared/interfacesAndTypes';

interface Props {
    open: boolean,
    onClose: () => void,
    project: IProject
}

const ShareProjectModal = ({open, onClose, project}: Props) => {
  const onCopyLink = async () => {
    //const link = await someRequest()
    //navigator.clipboard.writeText(link)
  }

  return (
    <BasicModal open={open}
      onClose={onClose}>
      <Box minWidth={'400px'} padding={'20px'}>
        <Box display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
          mb={'5px'}
        >
          <Typography>
             Share {project.name}
          </Typography>
          <CustomIconButton onClick={onClose}>
            <CloseIcon/>
          </CustomIconButton>
        </Box>

        <Box display={'flex'} flexDirection={'column'} mt={'15px'}>
          <Box display={'flex'}>
            <UserEmailInput id={'shared_user_email'}
              fullWidth
              placeholder={'Enter user email'}
              autoFocus />
          </Box>
          <Box mt={'20px'}>
            <Typography fontSize={'15px'}>
              Users invited
            </Typography>
          </Box>
          <Box mt={'20px'}>
            <Typography fontSize={'15px'}>
              Shared access
            </Typography>
          </Box>
          <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mt={'20px'}>
            <CopyLinkButton variant={'contained'} onClick={onCopyLink}> Copy link</CopyLinkButton>
            <InviteButton variant={'contained'} onClick={onClose}> Done</InviteButton>
          </Box>
        </Box>
      </Box>
    </BasicModal>
  );
};


const InviteButton = styled(Button)(() => ({
  marginLeft: '10px',
  backgroundColor: '#1976d2',
  color: '#ffffff',
  padding: '4px 20px',
}))

const CopyLinkButton = styled(Button)(() => ({
  'marginLeft': '10px',
  'backgroundColor': '#fff',
  'color': '#1976d2',
  'fontSize': '14px',
  'padding': '4px 16px',
  'textTransform': 'none',
  '&:hover': {
    backgroundColor: '#f1f1f1',
  },
}))

const UserEmailInput = styled(TextField)(() => ({
  '& input': {
    'padding': '4px 8px',
    '&::placeholder': {
      fontSize: '14px',
    },
  },
  '&:hover': {},
}))


export default ShareProjectModal;
