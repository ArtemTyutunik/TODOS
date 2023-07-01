import React from 'react';
import {Box, Typography} from '@mui/material';

const TagsFetchingFailed = () => {
  return (
    <Box maxWidth={'500px'} margin={'0 auto'} textAlign={'center'}>
      <img src={'/tagsFetchFailed.jpg'} alt={'error image'}/>
      <Typography fontWeight={700} fontSize={'20px'} sx={(theme) => ({color: theme.background.inboxIcon})}>
        Oops... We can not get your tags
      </Typography>
      <Typography fontSize={'15px'} marginTop={'10px'}>
        Try reload later or contact our support
      </Typography>
    </Box>
  );
};

export default TagsFetchingFailed;
