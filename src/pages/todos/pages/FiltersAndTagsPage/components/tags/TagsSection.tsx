import {Box, Divider, IconButton, Typography} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddIcon from '@shared/components/AddIcon';
import {useState} from 'react';
import FilterPageTagsList from '@pages/todos/pages/FiltersAndTagsPage/components/tags/FilterPageTagsList';
import CreateNewModal from '@pages/todos/pages/FiltersAndTagsPage/components/tags/CreateNewModal';
import {useVisable} from '@shared/hooks';
import {useSelector} from 'react-redux';
import {userTagsSelector} from '@entities/tag/store/tagStore';
import {arrowIconStyles} from './componentsStyles';


const TagsSection = () => {
  const [isListShown, setIsListShown] = useState(false)
  const [isOpen, open, close] = useVisable(false)
  const userTags = useSelector(userTagsSelector)

  return (
    <>
      <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mt={'20px'} mb={'5px'}>
        <Box display={'flex'} alignItems={'center'} position={'relative'}>
          <IconButton sx={arrowIconStyles()}
            className={isListShown ? 'rotated': ''}
            onClick={() => setIsListShown((prevState) => !prevState)}>
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
        (isListShown && <FilterPageTagsList userTags={userTags}/>)
      }
      {/*  Modal to create new Tag*/}
      <CreateNewModal isOpen={isOpen} onClose={close} allTags={userTags}/>
    </>

  );
};

export default TagsSection;
