import React from 'react';
import DrawerListItem from '@shared/components/DrawerListItem';
import {Box, List, ListItemButton, Typography} from '@mui/material';
import {IProject} from '@shared/interfacesAndTypes';
import {useNavigate} from 'react-router-dom';
import {useAnchorElement} from '@shared/hooks';
import DropdownMenu from '@shared/components/dropdownMenu';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CustomIconButton from '@shared/components/CustomIconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {CircleIcon} from '@shared/components/icons';
import {useProjectTodos} from '@entities/projects';
import TodosCount from '@shared/components/TodosCount';
import ProgressCircle from '@entities/projects/components/PorgressCircle';

interface Props {
  project: IProject,
  onDelete: (id: IProject['id']) => void
}
const ProjectListItem = ({project, onDelete}: Props) => {
  const navigate = useNavigate()
  const projectTodos = useProjectTodos(project.id)
  const allCount = projectTodos.length;
  const completedCount = projectTodos.filter((todo) => todo.done).length
  const [anchorElement, setAnchorElement, removeAnchorElement] = useAnchorElement(null)

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setAnchorElement(event.currentTarget);
  };

  return (
    <DrawerListItem onClick={() => navigate('/project/' + project.id)}>
      <Box sx={projectWrapper}>
        <Box display={'flex'} alignItems={'center'}>
          <Box sx={progressCircleWrapper}>
            <ProgressCircle all={allCount} completed={completedCount}/>
            <CircleIcon sx={{fontSize: '12px', color: project.color.background}}/>
          </Box>
          <Typography ml={'15px'}>
            {project.name}
          </Typography>
        </Box>

        <Box className={'todo-count'}>
          <TodosCount>
            {allCount > 0 && allCount}
          </TodosCount>
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


const projectWrapper = {
  'display': 'flex',
  'alignItems': 'center',
  'justifyContent': 'space-between',
  'width': '100%',
}

const progressCircleWrapper = {
  'position': 'relative',
  '& .progressCircleSvg': {
    'position': 'absolute',
    'left': '-6px',
    'top': '-1px',
    '& circle': {
      transition: 'stroke-dashoffset linear .7s',
    },
  },
}

export default ProjectListItem;
