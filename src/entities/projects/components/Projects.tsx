import React, {memo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import DrawerToggleList from '@shared/components/DrawerToggleList';
import {AddIcon} from '@shared/components/icons';
import CustomIconButton from '@shared/components/CustomIconButton';
import {useVisable} from '@shared/hooks';
import ProjectSettingsModal from '@entities/projects/components/ProjectSettingsModal';
import {deleteProject, projectsSelector, editProjectAction} from '@entities/projects/model/store';
import ProjectListItem from '@entities/projects/components/ProjectListItem';
import {IProject} from '@shared/interfacesAndTypes';
import {deleteProjectRequest, editProjectRequest} from '@shared/api/services/projects';
import {userIdSelector} from '@entities/user/model/store';
import useSortedProjects from '@entities/projects/hooks/useSortedProjects';
import {useNavigate} from 'react-router-dom';
import {updateTodos} from '@entities/todos/store/todo';

const Projects = memo(() => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isSettingModalOpen, openSettingMenu, closeSettingMenu] = useVisable(false);
  const projects = useSelector(projectsSelector)
  const [pinnedProjects, unpinnedProjects] = useSortedProjects(projects)
  const dispatch = useDispatch()
  const toggleList = () => setIsExpanded((prevState) => !prevState)
  const userId = useSelector(userIdSelector)
  const navigate = useNavigate()

  const onDelete = async (id: IProject['id']) => {
    try {
      const returnedTodos = await deleteProjectRequest(userId, id)
      dispatch(deleteProject(id))
      dispatch(updateTodos(returnedTodos))
      navigate('/today')
    } catch (e) {
      console.log(e)
    }
  }

  const onPinProject = async (id: IProject['id']) => {
    try {
      const project = projects.find((project) => project.id === id)
      if (project) {
        const newProject = {...project, isPinned: !project.isPinned}
        await editProjectRequest(userId, newProject)
        dispatch(editProjectAction(newProject))
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
