import React from 'react';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import {Box, ListItemButton, Typography} from '@mui/material';
import {useVisable} from '@shared/hooks';
import ShareProjectModal from '@entities/projects/components/projectListItems/ShareProject/ShareProjectModal';
import {IProject} from '@shared/interfacesAndTypes';
import {styled} from '@mui/material/styles';

interface Props {
    project: IProject
}
const ShareProjectItem = ({project}: Props) => {
  const [inviteToProjectModalOpen, openInviteToProjectModal, closeInviteToProjectModal] = useVisable(false)
  const verificationStatus = JSON.parse(localStorage.getItem('verified') || 'false');
  return (
    <>
      <Wrapper className={!verificationStatus ? 'disabled' : ''}>
        <ShareProjectItemButton
          disabled={!verificationStatus}
          onClick={openInviteToProjectModal}>
          <LockPersonIcon sx={{color: '#808080', fontSize: '18px'}}/>
          <Typography marginLeft={'15px'} fontSize={'15px'} color={'#202020'}>
                    Share project
          </Typography>
        </ShareProjectItemButton>
        <HoverTooltip className={'hover-tooltip'}>
              Verify your email
        </HoverTooltip>
      </Wrapper>

      {
        inviteToProjectModalOpen && <ShareProjectModal open={inviteToProjectModalOpen}
          project={project}
          onClose={closeInviteToProjectModal}/>
      }
    </>
  );
};

const Wrapper = styled(Box)(() => ({
  'position': 'relative',
  '&.disabled:hover': {
    '& .hover-tooltip': {
      opacity: '1',
    },
  },
}))

const ShareProjectItemButton = styled(ListItemButton)(() => ({
  'display': 'flex',
  'alignItems': 'center',
  'marginBottom': '10px',
}))


const HoverTooltip = styled(Box)(() => ({
  'position': 'absolute',
  'transition': 'opacity linear 0.2s',
  'top': '-50%',
  'backgroundColor': '#202020',
  'color': 'white',
  'fontSize': '11px',
  'padding': '3px 5px',
  'left': '25%',
  'opacity': '0',
  '&::after': {
    content: '" "',
    width: 0,
    height: 0,
    position: 'absolute',
    top: '100%',
    left: '50%',
    marginLeft: '-5px',
    borderLeft: '5px solid transparent',
    borderRight: '5px solid transparent',
    borderTop: '5px solid #202020',
  },
}))

export default ShareProjectItem;
