import React from 'react';
import {Box, TextField, Typography} from '@mui/material';

interface Props {
    isError: boolean,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    inputValue: string
}
const NameInput = ({isError, onChange, inputValue}: Props) => {
  return <Box mb={'15px'}>
    <Typography fontSize={'15px'} fontWeight={600} mb={'5px'}>
                  Tag name
    </Typography>
    <TextField onChange={onChange}
      value={inputValue}
      error={isError}
      helperText={`${inputValue} already exists`}
      variant={'outlined'}
      className={'create-tag-input'}
      inputProps={{autoFocus: true}}/>
  </Box>
};

export default NameInput;
