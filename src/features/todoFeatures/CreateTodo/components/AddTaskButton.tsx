import React from 'react';
import {AddIcon} from '@shared/components/icons';
import {Box, Theme, Typography} from '@mui/material';

const boxStyles = (theme: Theme) => ({
  'display': 'flex',
  'alignItems': 'center',
  'marginTop': '20px',
  'color': theme.description,
  'cursor': 'pointer',

  '&:hover': {
    color: theme.palette.primary.main,
  },
});

interface Props {
    onCreate(): void
}
const AddTaskButton = ({onCreate}: Props) => {
  return (
    <Box sx = {boxStyles} onClick={onCreate}>
      <AddIcon sx={{color: 'primary.main'}}/>
      <Typography ml={'10px'} color={'inherit'} fontSize={'15px'} fontWeight={300}>
         Add task
      </Typography>
    </Box>
  );
};

export default AddTaskButton;
