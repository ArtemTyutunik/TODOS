import React from 'react';
import {Box} from '@mui/material';

interface Props {
    size?: 'small' | 'large'
}
const SpinnerComponent = ({size = 'large'}: Props) => {
  return (
    <Box height={ size === 'large' && '100vh' || 'auto'}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}>
      <Box display={'flex'} alignItems={'center'} flexDirection={'column'}>
        <div className={`custom-loader  ${size === 'large'? 'custom-loader-large': 'custom-loader-small'}`}></div>
      </Box>
    </Box>
  );
};

export default SpinnerComponent;
