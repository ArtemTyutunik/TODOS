import React, {FC} from 'react';
import {useForm} from 'react-hook-form';
import {Box, Container, CssBaseline, Typography} from '@mui/material';
import {IFormInputs, IInputsProps} from '@shared/forms/interfaces/interfaces';
import FormInputs from '@entities/signUpForm/FormInputs';
import SubmitButton from '@shared/forms/authorization/SubmitButton';
import FromLink from '@shared/forms/authorization/FormLink';

const FormWrapperStyles = {
  marginTop: 8,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}

const SignUpForm:FC<IInputsProps> = ({onSubmit}) => {
  const {handleSubmit, control} = useForm<IFormInputs>({mode: 'onChange'});

  return (
    <Container component="main" maxWidth="laptop">
      <CssBaseline />
      <Box sx={FormWrapperStyles}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{mt: 1}}>
          <FormInputs control={control}/>
          <SubmitButton control={control}>
              Sign up
          </SubmitButton>
          <FromLink to={'/'}>
            Have account? Login
          </FromLink>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUpForm;
