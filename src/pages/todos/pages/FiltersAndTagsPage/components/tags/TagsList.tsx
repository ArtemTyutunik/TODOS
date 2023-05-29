import React from 'react';
import {useSelector} from 'react-redux';
import {RootReducer} from '@app/store';
import {Box, Typography} from '@mui/material';
import {default as LabelIcon} from '@mui/icons-material/LocalOffer';
import TodosCount from '@shared/components/TodosCount';

const TagsList = () => {
  const userTags = useSelector((state: RootReducer ) => state.userReducer.tags)
  return (
    <Box mt={'10px'}>
      {
        userTags.length !== 0 ?
            userTags.map((tag) => <TagItem key={tag}>{tag}</TagItem>) :
            <Box sx={{padding: '16px 0', fontSize: '16px', color: 'grey'}}>
              A place for your tags.
            </Box>
      }
    </Box>
  );
};

const tagNameStyle = {
  fontSize: '15px',
  color: 'rgb(128, 128, 128)',
  fontFamily: '-apple-system',
}

const tagItemContainer = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '8px 0',
  mt: '5px',
  cursor: 'pointer',
  borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
}
function TagItem({children}: {children: React.ReactElement}) {
  return <>
    <Box sx={tagItemContainer}>
      <Box display={'flex'} alignItems={'center'}>
        <LabelIcon sx={tagNameStyle}/>
        <Typography marginLeft={'10px'} color={'#333333'}>{children}</Typography>
      </Box>
      <TodosCount>
        1
      </TodosCount>
    </Box>
  </>
}

export default TagsList;
