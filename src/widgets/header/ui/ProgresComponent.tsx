import React from 'react';
import {Box, Tooltip, Typography} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {useSelector} from 'react-redux';
import {RootReducer} from '@shared/interfacesAndTypes';

const ProgressComponent = () => {
  const todos = useSelector((state: RootReducer) => state.todosReducer.todos);
  const completed = todos.filter((item) => item.done).length
  return (
    <Tooltip title={'Your progress'}>
      <Box display={'flex'} alignItems={'center'}>
        <CheckCircleOutlineIcon sx ={{marginRight: '5px'}}/>
        <Typography>
          {
            `${completed}/${todos.length}`
          }
        </Typography>
      </Box>
    </Tooltip>
  );
};

export default ProgressComponent;
