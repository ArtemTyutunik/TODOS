import React from 'react';
import {Box} from '@mui/material';

interface Props {
    children: React.ReactElement
}

const FormWrapperStyles = {
  marginTop: 8,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}

const FormWrapper = ({children}: Props) => {
  return (
    <Box sx={FormWrapperStyles}>
      {children}
    </Box>
  );
};

export default FormWrapper;
