import React from 'react';
import DrawerListItem from '@shared/components/DrawerListItem';
import {Box, Typography} from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import {IProject} from '@shared/interfacesAndTypes';
import {useNavigate} from 'react-router-dom';

const ProjectListItem = ({project}: {project: IProject}) => {
  const navigate = useNavigate()

  return (
    <DrawerListItem onClick={() => navigate('/project/' + project.id)}>
      <Box display={'flex'} alignItems={'center'}>
        <CircleIcon sx={{fontSize: '12px', color: project.color.background}}/>
        <Typography ml={'15px'}>
          {project.name}
        </Typography>
      </Box>

    </DrawerListItem>
  );
};

export default ProjectListItem;
