import React from 'react';
import {Box} from '@mui/material';

const FormAuth = ({children,
}: {children: React.ReactElement}) => {
  return (
    <Box display={'flex'} margin={'0 auto'} marginTop={'40px'}
      maxWidth={{tablet: '35%', laptop: 'fit-content'}}
      height={'fit-content'}
      padding={'0 10px'}>
      {
        children
      }
    </Box>
  );
};

export default FormAuth;
