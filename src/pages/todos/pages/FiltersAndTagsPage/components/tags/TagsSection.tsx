import {Box, Divider, IconButton, Typography} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddIcon from '@shared/components/AddIcon';
import {useState} from 'react';
import TagsList from '@pages/todos/pages/FiltersAndTagsPage/components/tags/TagsList';
import CreateNewModal from '@pages/todos/pages/FiltersAndTagsPage/components/CreateNewModal';
import useVisable from '@shared/hooks/useVisable';

const arrowIconStyles = () => ({
  'fontSize': '14px',
  'position': 'absolute',
  'left': '-25px',
  'padding': '4px',
  'borderRadius': '4px',

  '&.rotated': {
    transform: 'rotate(90deg)',
  },
})

const TagsSection = () => {
  const [isListShown, setIsListShown] = useState(false)
  const [isOpen, open, close] = useVisable(false)
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
        (isListShown && <TagsList/>)
      }
      {/*  Modal to create new Tag*/}
      <CreateNewModal isOpen={isOpen} onClose={close}/>
    </>

  );
};

export default TagsSection;
