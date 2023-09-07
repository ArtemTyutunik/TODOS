import React from 'react';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import {ListItemButton, Typography} from '@mui/material';
import {useVisable} from '@shared/hooks';
import ShareProjectModal from '@entities/projects/components/projectListItems/ShareProject/ShareProjectModal';

const ShareProjectItem = () => {
  const [inviteToProjectModalOpen, openInviteToProjectModal, closeInviteToProjectModal] = useVisable(false)

  return (
    <>
      <ListItemButton sx={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}
        onClick={openInviteToProjectModal}>
        <LockPersonIcon sx={{color: '#808080', fontSize: '18px'}}/>
        <Typography marginLeft={'15px'} fontSize={'15px'} color={'#202020'}>
              Share project
        </Typography>
      </ListItemButton>
      {
        inviteToProjectModalOpen && <ShareProjectModal open={inviteToProjectModalOpen}
          onClose={closeInviteToProjectModal}/>
      }
    </>
  );
};

export default ShareProjectItem;
