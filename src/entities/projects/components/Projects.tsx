import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import DrawerToggleList from '@shared/components/DrawerToggleList';
import AddIcon from '@shared/components/AddIcon';
import CustomIconButton from '@shared/components/CustomIconButton';
import {useVisable} from '@shared/hooks';
import ProjectSettingsModal from '@entities/projects/components/ProjectSettingsModal';
import {projectsSelector} from '@entities/projects/model/store';
import ProjectListItem from '@entities/projects/components/ProjectListItem';

const Projects = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isSettingModalOpen, openSettingMenu, closeSettingMenu] = useVisable(false);
  const projects = useSelector(projectsSelector)
  const toggleList = () => setIsExpanded((prevState) => !prevState)

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
          {projects.map((item) => <ProjectListItem project={item} key={item.id}/>)}
        </div>
      }
    </>
  );
};

export default Projects;
