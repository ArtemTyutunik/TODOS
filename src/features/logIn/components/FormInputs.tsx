import React from 'react';
import {Control, Controller, useFormState} from 'react-hook-form';
import {loginValidation, passwordValidation} from '@shared/forms/validation/validation';
import {TextField} from '@mui/material';
import {IFormInputs} from '@shared/forms/interfaces/interfaces';
import PasswordInput from '@shared/forms/authorization/passwordInput';

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
          type={'email'}
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
        render={({field}) => <PasswordInput onChange={field.onChange}
          errorMessage={errors?.password?.message}/>}
      />
    </>
  );
};

export default LoginInputs;
