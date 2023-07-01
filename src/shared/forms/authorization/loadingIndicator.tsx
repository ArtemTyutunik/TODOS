import React from 'react';
import {Box} from '@mui/material';
import SpinnerComponent from '@shared/components/SpinnerComponent/SpinnerComponent';

const LoadingIndicator = ({isPending, showingSuccess}: {isPending: boolean, showingSuccess: boolean}) => {
  return (isPending || showingSuccess) ? (
      <Box position={'absolute'} display={'flex'} alignItems={'center'} top={0} left={0} right={0} zIndex={10} bottom={0}
        sx={{background: 'rgba(255,255,255, 0.8)'}}>
        {
          isPending && <SpinnerComponent size={'medium'}/>
        }
        {
          showingSuccess && <Box width={'150px'} height={'180px'} margin={'0 auto'}>
            <img src={'./loading-success.gif'} alt={'success gif'}/>
          </Box>
        }
      </Box>
      ) : null
};

export default LoadingIndicator;
