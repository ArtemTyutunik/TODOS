import React from 'react';
import {Box} from '@mui/material';

interface Props {
    size?: 'small' | 'large' | 'medium'
}
const SpinnerComponent = ({size = 'large'}: Props) => {
  return (
    <Box height={ size === 'large' && '100vh' || 'auto'}
      display={'flex'}
      margin={'0 auto'}
      justifyContent={'center'}
      alignItems={'center'}>
      <Box display={'flex'} alignItems={'center'} flexDirection={'column'}>
        <div className={`custom-loader  custom-loader-${size}`}></div>
      </Box>
    </Box>
  );
};

export default SpinnerComponent;
