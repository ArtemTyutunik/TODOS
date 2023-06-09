import {Box, Divider, IconButton, Typography} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddIcon from '@shared/components/AddIcon';
import FilterPageTagsList from '@pages/todos/pages/FiltersAndTagsPage/components/tags/FilterPageTagsList';
import CreateNewModal from '@pages/todos/pages/FiltersAndTagsPage/components/tags/CreateNewModal';
import {useVisable} from '@shared/hooks';
import {useSelector} from 'react-redux';
import {userTagsSelector} from '@entities/tag/store/tagStore';
import {arrowIconStyles} from './componentsStyles';
import useToggleTag from '@pages/todos/pages/FiltersAndTagsPage/components/tags/hooks/useToggleTags';


const TagsSection = () => {
  const [isOpenTagList, toggleTagList] = useToggleTag();

  const [isOpen, open, close] = useVisable(false)
  const userTags = useSelector(userTagsSelector)

  return (
    <>
      <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mt={'20px'} mb={'5px'}>
        <Box display={'flex'} alignItems={'center'} position={'relative'}>
          <IconButton sx={arrowIconStyles()}
            className={isOpenTagList ? 'rotated': ''}
            onClick={toggleTagList}>
            <ArrowForwardIosIcon sx={{fontSize: 'inherit', color: 'grey'}}/>
          </IconButton>
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
      <CreateNewModal isOpen={isOpen} onClose={close}/>
    </>
  );
};

export default TagsSection;
