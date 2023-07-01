import React from 'react';
import {Box} from '@mui/material';

const SettingModalWrapper = ({children}: {children: React.ReactNode}) => {
  return (
    <Box minWidth={{laptop: '500px', largeMobile: '400px'}} sx={(theme) => ({color: theme.text.title})}>
      {children}
    </Box>
  );
};

export default SettingModalWrapper;
