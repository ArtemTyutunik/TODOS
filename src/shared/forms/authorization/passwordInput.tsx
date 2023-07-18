import React, {useState} from 'react';
import {Box, InputAdornment, TextField} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface Props {
    onChange: () => void,
    errorMessage: string | undefined
}

const PasswordInput = ({onChange, errorMessage}: Props) => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePassword = (currentState: boolean) => setShowPassword(!currentState)

  const AdornmentIcon = () => showPassword ? <VisibilityIcon fontSize={'inherit'} sx={{color: 'red'}}/> :
      <VisibilityOffIcon fontSize={'inherit'}/>

  return <TextField
    onChange={onChange}
    margin="normal"
    required
    fullWidth
    name="password"
    label="Password"
    type={showPassword ? 'text' : 'password'}
    id="password"
    autoComplete="current-password"
    error={ !!errorMessage }
    helperText={errorMessage}
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <Box onClick={() => togglePassword(showPassword)} fontSize={'19px'} sx={{cursor: 'pointer'}}>
            <AdornmentIcon/>
          </Box>
        </InputAdornment>
      ),
    }}
  />
};

export default PasswordInput;
