import React from 'react';
import {Box, Typography} from '@mui/material';
import {ErrorIcon} from '@shared/components/icons';

const ErrorComponent = () => {
  return (
    <Box display={'flex'} alignItems={'center'} padding={'10px'}>
      <ErrorIcon sx={{fontSize: '15px', color: 'red'}}/>
      <Typography fontSize={'14px'} marginLeft={'10px'} color={'#202020'}>
         There was an error fetching your tags
      </Typography>
    </Box>
  );
};

export default ErrorComponent;
