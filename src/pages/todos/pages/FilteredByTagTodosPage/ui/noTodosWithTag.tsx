import React from 'react';
import {Box, Typography} from '@mui/material';

const NoTodosWithTag = () => {
  return <Box display={'flex'}
    flexDirection={'column'}
    margin={'0 auto'}
    alignItems={'center'}
    textAlign={'center'}>
    <img style={{alignSelf: 'center'}}
      src="https://todoist.b-cdn.net/assets/images/5912cb674b44ab3d789ea98c95d1cfe3.jpg" alt=""/>
    <Typography color={'#202020'} fontWeight={700}>
      No todos found, try adding this tag to some tasks…
    </Typography>
  </Box>
};

export default NoTodosWithTag;
