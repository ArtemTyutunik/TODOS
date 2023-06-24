import React from 'react';
import DrawerListItem from '@shared/components/DrawerListItem';
import {Box, List, ListItemButton, Typography} from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import {IProject} from '@shared/interfacesAndTypes';
import {useNavigate} from 'react-router-dom';
import {useAnchorElement} from '@shared/hooks';
import DropdownMenu from '@shared/components/dropdownMenu';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CustomIconButton from '@shared/components/CustomIconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

interface Props {
  project: IProject,
  onDelete: (id: IProject['id']) => void
}
const ProjectListItem = ({project, onDelete}: Props) => {
  const navigate = useNavigate()
  const [anchorElement, setAnchorElement, removeAnchorElement] = useAnchorElement(null)

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setAnchorElement(event.currentTarget);
  };

  return (
    <DrawerListItem onClick={() => navigate('/project/' + project.id)}>
      <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
        <Box display={'flex'} alignItems={'center'}>
          <CircleIcon sx={{fontSize: '12px', color: project.color.background}}/>
          <Typography ml={'15px'}>
            {project.name}
          </Typography>
        </Box>

        <Box className={'hover_content'} sx={{opacity: `${anchorElement && '1' || '0'}`}}>
          <CustomIconButton onClick={handleOpenMenu}>
            <MoreHorizIcon fontSize={'small'}/>
          </CustomIconButton>
          <DropdownMenu anchorEl={anchorElement} handleClose={removeAnchorElement}>
            <Box padding={'10px'}>
              <List>
                <ListItemButton sx={{display: 'flex', alignItems: 'center'}}
                  onClick={ () => onDelete(project.id)}>
                  <DeleteOutlineIcon sx={{color: '#808080', fontSize: '18px'}}/>
                  <Typography marginLeft={'15px'} fontSize={'15px'} color={'#202020'}>
                    Delete Project
                  </Typography>
                </ListItemButton>
              </List>
            </Box>
          </DropdownMenu>
        </Box>
      </Box>

    </DrawerListItem>
  );
};

export default ProjectListItem;
