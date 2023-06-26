import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import DrawerToggleList from '@shared/components/DrawerToggleList';
import {AddIcon} from '@shared/components/icons';
import CustomIconButton from '@shared/components/CustomIconButton';
import {useVisable} from '@shared/hooks';
import ProjectSettingsModal from '@entities/projects/components/ProjectSettingsModal';
import {deleteProject, projectsSelector} from '@entities/projects/model/store';
import ProjectListItem from '@entities/projects/components/ProjectListItem';
import {IProject} from '@shared/interfacesAndTypes';
import {deleteProjectRequest} from '@shared/api/services/projects';
import {userIdSelector} from '@entities/user/model/store';

const Projects = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isSettingModalOpen, openSettingMenu, closeSettingMenu] = useVisable(false);
  const projects = useSelector(projectsSelector)
  const dispatch = useDispatch()
  const toggleList = () => setIsExpanded((prevState) => !prevState)
  const userId = useSelector(userIdSelector)

  const onDelete = async (id: IProject['id']) => {
    try {
      await deleteProjectRequest(userId, id)
      dispatch(deleteProject(id))
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
        isSettingModalOpen && <ProjectSettingsModal projects={projects} isOpen={isSettingModalOpen}
          onClose={closeSettingMenu}/>
      }
      {
        isExpanded && <div>
          {
            projects.map((item) => <ProjectListItem key={item.id}
              project={item}
              onDelete={onDelete}/>)
          }
        </div>
      }
    </>
  );
};

export default Projects;
