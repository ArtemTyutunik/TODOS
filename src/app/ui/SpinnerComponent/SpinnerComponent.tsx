import React from 'react';
import {Box, Typography} from '@mui/material';

import './SpinnerComponent.css'
const SpinnerComponent = () => {
  return (
    <Box height={'100vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
      <div>
        <Typography>
                Todos
        </Typography>
        <div className="custom-loader"></div>
      </div>
    </Box>
  );
};

export default SpinnerComponent;
