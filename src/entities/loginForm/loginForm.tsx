import React from 'react';
import {useForm} from 'react-hook-form';
import {Box, Container, CssBaseline, Typography} from '@mui/material';
import {IFormInputs, IInputsProps} from '@shared/forms/interfaces/interfaces';
import ErrorMessage from '@shared/forms/authorization/ErrorMessage';
import SubmitButton from '@shared/forms/authorization/SubmitButton';
import FormLink from '@shared/forms/authorization/FormLink';
import LoginInputs from '@entities/loginForm/ui/FormInputs';
import FormWrapper from '@shared/forms/authorization/FormWrapper';


function LoginForm({onSubmit}: IInputsProps) {
  const {handleSubmit, control} = useForm<IFormInputs>();

  return (
    <Container component="main" maxWidth="laptop">
      <CssBaseline />
      <FormWrapper>
        <>
          <Typography component="h1" variant="h5">
              Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{mt: 1}}>
            <LoginInputs control={control}/>
            <ErrorMessage/>

            <SubmitButton control={control}>
                  Login
            </SubmitButton>
            <FormLink to='/sign-up'>
              {'Don`t have an account? Sign Up'}
            </FormLink>
          </Box>
        </>
      </FormWrapper>
    </Container>

  );
}

export default LoginForm;
