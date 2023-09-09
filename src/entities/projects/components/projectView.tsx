import React from 'react';
import {CircleIcon, InboxIcon} from '@shared/components/icons';
import {Box, Typography} from '@mui/material';

interface Props {
    color?: string,
    name?: string,
    id: string
}

const ProjectView = ({color, name, id}: Props) => {
  const inboxID = localStorage.getItem('inboxID')!
  return inboxID === id ? <InboxProject/> : <Box sx={selectItemStyles}>
    <CircleIcon sx={{fontSize: '12px', color: color}}/>
    <Typography ml={'10px'} fontSize={'13px'} color={'#202020'}>
      {name}
    </Typography>
  </Box>
}

const InboxProject = () => {
  return <Box sx={selectItemStyles}>
    <InboxIcon sx={(theme) => ({color: theme.background.inboxIcon, fontSize: '17px'})}/>
    <Typography ml={'10px'} fontSize={'13px'} color={'#202020'}>
          Inbox
    </Typography>
  </Box>
}

const selectItemStyles = {
  display: 'flex',
  padding: '0px 15px',
  alignItems: 'center',
}


export default ProjectView;
