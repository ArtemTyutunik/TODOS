import React from 'react';
import {Box, Divider, Typography} from '@mui/material';

interface Props {
    children: React.ReactNode,
    label: string
}
const DetailActionPanelItem = ({children, label}: Props) => {
  return (
    <Box display={'flex'} flexDirection={'column'} mb={'20px'}>
      <Box mb={'5px'}>
        <Typography fontSize={'12px'} fontWeight={600} color={'rgba(0,0,0,0.56)'}>
          {label}
        </Typography>
      </Box>
      <Box mb={'10px'}>
        {children}
      </Box>
      <Divider/>
    </Box>
  );
};

export default DetailActionPanelItem;
