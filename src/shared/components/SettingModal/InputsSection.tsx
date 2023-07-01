import React from 'react';
import {Box} from '@mui/material';

interface Props {
    isError: boolean,
    children: React.ReactNode
}
const InputsSection = ({children, isError}: Props) => {
  return (
    <Box sx={inputSectionStyle(isError)}>
      {children}
    </Box>
  );
};

const inputSectionStyle = (isError: boolean) => ({
  'display': 'flex',
  'flexDirection': 'column',
  'justifyContent': 'flex-start',
  'padding': '10px 15px',
  'border': '1px solid #f5f5f5',
  'borderLeft': 0,
  'borderRight': 0,
  'marginBottom': '10px',
  '& .create-tag-input .MuiInputBase-root': {
    '& fieldset': {
      'border': `1px solid  ${isError? 'red' : '#ddd'}`,
    },
  },
  '& .create-tag-input': {
    'width': '100%',
    '& .MuiFormHelperText-root': {
      display: isError ? 'block' : 'none',
      color: 'red',
    },
  },
})

export default InputsSection;
