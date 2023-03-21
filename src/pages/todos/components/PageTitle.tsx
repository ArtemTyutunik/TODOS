import React from 'react';
import {Typography, useTheme} from '@mui/material';

interface Props {
    children?: React.ReactNode
}
const PageTitle = ({children}: Props) => {
  const theme = useTheme()
  return (
    <Typography fontSize={'18px'} fontWeight={'700'} color={theme.text.title} marginTop={'10px'}>
      {children}
    </Typography>
  );
};

export default PageTitle;
