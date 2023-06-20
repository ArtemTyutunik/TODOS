import React, {useState} from 'react';
import DrawerToggleList from '@shared/components/DrawerToggleList';
import AddIcon from '@shared/components/AddIcon';
import CustomIconButton from '@shared/components/CustomIconButton';

const Projects = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <>
      <DrawerToggleList title={'Projects'}
        isExpanded={isExpanded}
        onArrowClick={() => setIsExpanded(true)}>
        <CustomIconButton sx={{marginRight: '10px'}}>
          <AddIcon sx={{color: '#808080', fontSize: '19px'}}/>
        </CustomIconButton>
      </DrawerToggleList>
    </>
  );
};

export default Projects;
