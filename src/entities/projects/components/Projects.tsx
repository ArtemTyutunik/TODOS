import React, {memo, useState} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch} from '@app/store';

import {AddIcon} from '@shared/components/icons';
import CustomIconButton from '@shared/components/CustomIconButton';
import {useVisable} from '@shared/hooks';
import ProjectSettingsModal from '@entities/projects/components/ProjectSettingsModal';
import {projectsSelector} from '@entities/projects/model/store';
import ProjectListItem from '@entities/projects/components/ProjectListItem';
import {IProject} from '@shared/interfacesAndTypes';
import DrawerToggleList from '@shared/components/DrawerToggleList';
import useSortedProjects from '@entities/projects/hooks/useSortedProjects';
import {deleteProjectThunk, pinProjectThunk} from '@entities/projects/model/thunks';

const Projects = memo(() => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isSettingModalOpen, openSettingMenu, closeSettingMenu] = useVisable(false);
  const projects = useSelector(projectsSelector)
  const [pinnedProjects, unpinnedProjects] = useSortedProjects(projects)
  const dispatch = useAppDispatch()
  const toggleList = () => setIsExpanded((prevState) => !prevState)
  const navigate = useNavigate()

  const onDelete = async (id: IProject['id']) => {
    dispatch(deleteProjectThunk(id))
    navigate('/today')
  }

  const onPinProject = async (id: IProject['id']) => {
    try {
      const project = projects.find((project) => project.id === id)
      if (project) {
        const newProject = {...project, isPinned: !project.isPinned}
        dispatch(pinProjectThunk(newProject))
      } else {
        throw new Error('error')
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <DrawerToggleList title={'Projects'}
        isExpanded={isExpanded}
        onArrowClick={toggleList}
      >
        <CustomIconButton sx={{marginRight: '10px'}} onClick={openSettingMenu}>
          <AddIcon sx={{color: '#808080', fontSize: '19px'}}/>
        </CustomIconButton>
      </DrawerToggleList>
      {
        isExpanded && <div>
          {
            pinnedProjects.map((item) => <ProjectListItem key={item.id}
              project={item}
              onPinToggle={onPinProject}
              onDelete={onDelete}/>)
          }
          {
            unpinnedProjects.map((item) => <ProjectListItem key={item.id}
              project={item}
              onPinToggle={onPinProject}
              onDelete={onDelete}/>)
          }
        </div>
      }

      {
        isSettingModalOpen && <ProjectSettingsModal isOpen={isSettingModalOpen}
          onClose={closeSettingMenu}/>
      }
    </>
  );
});

export default Projects;
