import React from 'react';
import AddButtonIcon from '../../../shared/components/AddIcon';
import {Box, Typography} from '@mui/material';

const boxStyles = {
  'display': 'flex',
  'alignItems': 'center',
  'marginTop': '20px',
  'color': '#515761',
  'cursor': 'pointer',

  '&:hover': {
    color: '#1976d2',
  },
};

interface Props {
    onCreate(): void
}
const AddTaskButton = ({onCreate}: Props) => {
  return (
    <Box sx = {boxStyles} onClick={onCreate}>
      <AddButtonIcon sx={{color: '#1976d2'}}/>
      <Typography ml={'10px'} color={'inherit'} fontSize={'15px'} fontWeight={300}>
                Add task
      </Typography>
    </Box>
  );
};

export default AddTaskButton;
