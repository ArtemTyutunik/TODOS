import React from 'react';
import DrawerListItem from '@shared/components/DrawerListItem';
import {Edit} from '@mui/icons-material';
import {Box, Divider, List, ListItemButton, Typography} from '@mui/material';
import {IProject} from '@shared/interfacesAndTypes';
import {useNavigate} from 'react-router-dom';
import {useAnchorElement, useVisable} from '@shared/hooks';
import DropdownMenu from '@shared/components/dropdownMenu';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CustomIconButton from '@shared/components/CustomIconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {CircleIcon, PushPinIcon} from '@shared/components/icons';
import {useProjectTodos} from '@entities/projects';
import TodosCount from '@shared/components/TodosCount';
import ProgressCircle from '@entities/projects/components/PorgressCircle';
import ProjectSettingsModal from '@entities/projects/components/ProjectSettingsModal';
import ShareProjectItem from '@entities/projects/components/projectListItems/ShareProject/ShareProjectItem';

interface Props {
  project: IProject,
  onDelete: (id: IProject['id']) => void,
  onPinToggle: (id: IProject['id']) => void,
}

const ProjectListItem = ({project, onDelete, onPinToggle}: Props) => {
  const navigate = useNavigate()
  const projectTodos = useProjectTodos(project.id)
  const allCount = projectTodos.length;
  const completedCount = projectTodos.filter((todo) => todo.done).length

  const [editingForm, openEditingForm, CloseEditingForm] = useVisable(false)
  const [anchorElement, setAnchorElement, removeAnchorElement] = useAnchorElement(null)

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElement(event.currentTarget);
  };

  return (
    <DrawerListItem onClick={() => navigate('/project/' + project.id)}>
      {
        project?.isPinned && <PushPinIcon sx={{color: '#e86262', fontSize: '15px'}}/>
      }
      <Box sx={projectWrapper} marginLeft={`${project?.isPinned && '10px'}`}>
        <Box display={'flex'} alignItems={'center'}>
          <Box sx={progressCircleWrapper}>
            <ProgressCircle all={allCount} completed={completedCount}/>
            <CircleIcon sx={{fontSize: '12px', color: project.color.background}}/>
          </Box>
          <Typography ml={'15px'}>
            {project.name}
          </Typography>
        </Box>

        <Box className={`todo-count ${anchorElement && 'hide-todo-count'}`}>
          <TodosCount>
            {allCount > 0 && allCount}
          </TodosCount>
        </Box>

        <Box className={`hover_content ${anchorElement && 'keepActive'}`}>
          <CustomIconButton onClick={handleOpenMenu}>
            <MoreHorizIcon fontSize={'small'}/>
          </CustomIconButton>

          {/*Todo remove propagation*/}
          <DropdownMenu anchorEl={anchorElement} handleClose={removeAnchorElement}>
            <Box padding={'10px'}>
              <List>
                <ListItemButton sx={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}
                  onClick={() => onPinToggle(project.id)}>
                  <PushPinIcon sx={{color: project?.isPinned ? '#e86262' : '#808080',
                    fontSize: '18px'}}/>
                  <Typography marginLeft={'15px'} fontSize={'15px'} color={'#202020'}>
                    Pin project
                  </Typography>
                </ListItemButton>

                <ListItemButton sx={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}
                  onClick={openEditingForm}>
                  <Edit sx={{color: '#808080', fontSize: '18px'}}/>
                  <Typography marginLeft={'15px'} fontSize={'15px'} color={'#202020'}>
                    Edit project
                  </Typography>
                </ListItemButton>

                <ShareProjectItem/>
                <Divider/>

                <ListItemButton sx={{display: 'flex', alignItems: 'center'}}
                  onClick={ () => onDelete(project.id)}>
                  <DeleteOutlineIcon sx={{color: '#808080', fontSize: '18px'}}/>
                  <Typography marginLeft={'15px'} fontSize={'15px'} color={'#202020'}>
                    Delete project
                  </Typography>
                </ListItemButton>
                {
                  editingForm && <ProjectSettingsModal editingMode
                    isOpen={editingForm}
                    editingProject={project}
                    onClose={CloseEditingForm}/>
                }
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
