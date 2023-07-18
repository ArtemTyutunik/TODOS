import React, {FC} from 'react';
import {useForm} from 'react-hook-form';
import {Box, Typography} from '@mui/material';
import {IFormInputs, IInputsProps} from '@shared/forms/interfaces/interfaces';
import FormInputs from '@features/signUp/components/FormInputs';
import SubmitButton from '@shared/forms/authorization/SubmitButton';
import FromLink from '@shared/forms/authorization/FormLink';
import FormWrapper from '@shared/forms/authorization/FormWrapper';
import ErrorMessage from '@shared/forms/authorization/ErrorMessage';
import AppLogo from '@shared/components/AppLogo';
import FormAuth from '@shared/forms/authorization/Form';
import LoadingIndicator from '@shared/forms/authorization/loadingIndicator';
import SignUpWithGoogle from '@pages/authentication/components/signUpWithGoogle';

const SignUpForm:FC<IInputsProps> = ({onSubmit, isPending, isSuccess}) => {
  const {handleSubmit, control} = useForm<IFormInputs>({mode: 'onChange'});

  return <Box>
    <Box display={'flex'} alignItems={'center'}>
      <Box width={'50%'} display={{mobile: 'none', largeMobile: 'none', tablet: 'block'}}>
        <AppLogo sx={{color: '#1976d2', marginTop: '20px', marginLeft: '20px'}}/>
        <Box sx={welcomeBackBlock}>
        </Box>
      </Box>
      <FormAuth>
        <FormWrapper>
          <>
            <Typography component="h1" variant="h5" color={'#1976d2'}>
                Sign up
            </Typography>

            <Box component="form"
              className={'AuthForm'}
              onSubmit={handleSubmit(onSubmit)}
              noValidate sx={{mt: 1}}>
              <FormInputs control={control}/>
              <ErrorMessage/>

              <SignUpWithGoogle/>
              <SubmitButton control={control} pending={isPending}>
                  Sign up
              </SubmitButton>
              <FromLink to={'/login'}>
                  Have account? Login
              </FromLink>
            </Box>

            <LoadingIndicator isPending={isPending} showingSuccess={isSuccess}/>
          </>
        </FormWrapper>
      </FormAuth>
    </Box>
  </Box>
};

const welcomeBackBlock = {
  width: '100%',
  height: 'calc(100vh - 60px)',
  backgroundImage: 'url("/signUpPageImage.jpg")',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
}

export default SignUpForm;
