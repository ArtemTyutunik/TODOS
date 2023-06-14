import React from 'react';
import {Box, useTheme} from '@mui/material';

interface Props {
    children?: React.ReactNode
}
const PageTitle = ({children}: Props) => {
  const theme = useTheme()
  return (
    <Box fontSize={'18px'}
      fontWeight={'700'}
      color={theme.text.title}
      marginTop={'10px'}
      display={'inline-block'}>
      {children}
    </Box>
  );
};

export default PageTitle;
