import React from 'react';
import {Typography} from '@mui/material';

interface Props {
    children?: React.ReactNode
}
const PageTitle = ({children}: Props) => {
  return (
    <Typography fontSize={'18px'} fontWeight={'700'} color={'#202020'} marginTop={'10px'}>
      {children}
    </Typography>
  );
};

export default PageTitle;
