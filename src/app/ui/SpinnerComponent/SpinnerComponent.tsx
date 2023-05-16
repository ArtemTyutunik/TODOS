import React from 'react';
import {Box} from '@mui/material';

const SpinnerComponent = () => {
  return (
    <Box height={'100vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
      <Box display={'flex'} alignItems={'center'} flexDirection={'column'}>
        <div className="custom-loader"></div>
      </Box>
    </Box>
  );
};

export default SpinnerComponent;
