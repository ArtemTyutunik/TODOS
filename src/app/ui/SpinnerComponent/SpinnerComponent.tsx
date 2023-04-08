import React from 'react';
import {Box, Typography} from '@mui/material';


import './SpinnerComponent.css'
const SpinnerComponent = () => {
  return (
    <Box height={'100vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
      <Box display={'flex'} alignItems={'center'} flexDirection={'column'}>
        <Typography color={'#1976d2'} fontSize={'45px'}>
                Todos
        </Typography>
        <div className="custom-loader"></div>
      </Box>
    </Box>
  );
};

export default SpinnerComponent;
