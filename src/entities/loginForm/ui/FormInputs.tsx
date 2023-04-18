import React from 'react';
import {Control, Controller, useFormState} from 'react-hook-form';
import {loginValidation, passwordValidation} from '@shared/forms/validation/validation';
import {TextField} from '@mui/material';
import {IFormInputs} from '@shared/forms/interfaces/interfaces';

interface Props {
  control: Control<IFormInputs>
}

const LoginInputs = ({control}: Props) => {
  const {errors} = useFormState({control})

  return (
    <>
      <Controller
        control={control}
        name={'login'}
        rules={loginValidation}
        render={({field}) => <TextField
          onChange={field.onChange}
          margin="normal"
          required
          fullWidth
          label="Login"
          name="email"
          autoComplete="email"
          autoFocus
          error={ !!errors?.login?.message }
          helperText={ errors?.login?.message }
        />}
      />
      <Controller
        control={control}
        name={'password'}
        rules = {passwordValidation}
        render={({field}) => <TextField
          onChange={field.onChange}
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          error={ !!errors?.password?.message }
          helperText={ errors?.password?.message }
        />}
      />
    </>
  );
};

export default LoginInputs;
