import {Box, Divider, IconButton, Typography} from '@mui/material';
import AddIcon from '@shared/components/AddIcon';
import FilterPageTagsList from '@pages/todos/pages/FiltersAndTagsPage/components/tags/FilterPageTagsList';
import TagInfoModal from '@pages/todos/pages/FiltersAndTagsPage/components/tags/TagInfoModal';
import {useVisable} from '@shared/hooks';
import {useSelector} from 'react-redux';
import {userTagsSelector} from '@entities/tag/store/tagStore';
import useToggleTag from '@pages/todos/pages/FiltersAndTagsPage/components/tags/hooks/useToggleTags';
import ToggleArrowIcon from '@shared/components/toggleArrowIcon';
import {arrowIconStyles} from '@pages/todos/pages/FiltersAndTagsPage/components/tags/componentsStyles';

const TagsSection = () => {
  const [isOpenTagList, toggleTagList] = useToggleTag();

  const [isOpen, open, close] = useVisable(false)
  const userTags = useSelector(userTagsSelector)

  return (
    <>
      <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mt={'20px'} mb={'5px'}>
        <Box display={'flex'} alignItems={'center'} position={'relative'}>
          <ToggleArrowIcon isExpanded={isOpenTagList}
            onClick={toggleTagList}
            sx={arrowIconStyles}/>
          <Typography fontWeight={600} fontSize={'15px'}>
             Tags
          </Typography>
        </Box>
        <IconButton sx={{padding: '0px', borderRadius: '4px'}} onClick={open}>
          <AddIcon/>
        </IconButton>
      </Box>
      <Divider/>
      {
        (isOpenTagList && <FilterPageTagsList userTags={userTags}/>)
      }
      {/*  Modal to create new Tag*/}
      {
        isOpen && <TagInfoModal isOpen={isOpen} onClose={close}/>
      }
    </>
  );
};

export default TagsSection;
