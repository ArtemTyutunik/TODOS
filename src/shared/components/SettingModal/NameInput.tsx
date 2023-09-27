import React, {FormEvent} from 'react';
import {Box, TextField, Typography} from '@mui/material';

interface Props {
    isError: boolean,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    inputValue: string
    onSubmit: (() => void) | null
}
const NameInput = ({isError, onChange, inputValue, onSubmit}: Props) => {
  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault()
    if (onSubmit && typeof onSubmit === 'function') {
      onSubmit()
    }
  }

  return <Box mb={'15px'}>
    <Typography fontSize={'15px'} fontWeight={600} mb={'5px'}>
                  Tag name
    </Typography>
    <form onSubmit={onSubmitHandler}>
      <TextField onChange={onChange}
        value={inputValue}
        error={isError}
        helperText={`${inputValue} already exists`}
        variant={'outlined'}
        className={'create-tag-input'}
        inputProps={{autoFocus: true}}/>
    </form>

  </Box>
};

export default NameInput;
