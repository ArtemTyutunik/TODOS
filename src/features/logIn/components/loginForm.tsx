import React from 'react';
import {useForm} from 'react-hook-form';
import {Box, Container, Typography} from '@mui/material';
import {IFormInputs, IInputsProps} from '@shared/forms/interfaces/interfaces';
import ErrorMessage from '@shared/forms/authorization/ErrorMessage';
import SubmitButton from '@shared/forms/authorization/SubmitButton';
import FormLink from '@shared/forms/authorization/FormLink';
import LoginInputs from '@features/logIn/components/FormInputs';
import FormWrapper from '@shared/forms/authorization/FormWrapper';
import '@features/logIn/components/AuthFormStyles.css'
import AppLogo from '@shared/components/AppLogo';
import FormAuth from '@shared/forms/authorization/Form';
import LoadingIndicator from '@shared/forms/authorization/loadingIndicator';
import SignInWithGoogle from '@pages/authentication/components/signInWithGoogle';

function LoginForm({onSubmit, isPending, isSuccess}: IInputsProps) {
  const {handleSubmit, control} = useForm<IFormInputs>();

  return (
    <Box>
      <Box display={'flex'}>
        <Box sx={welcomeBackBlock}>
          <Container maxWidth={'largeMobile'}>
            <AppLogo sx={{color: '#fff', marginTop: '20px'}}/>
            <Box textAlign={'center'} display={'flex'} height={'calc(100vh - 160px)'} alignItems={'center'}>
              <Box width={'90%'} margin={'0 auto'}>
                <Typography color={'#fff'} fontSize={'18px'}>
                  Nice to see you again
                </Typography>
                <Typography color={'#fff'} fontSize={'35px'} letterSpacing={'0.4em'}>
                  WELCOME BACK
                </Typography>
                <Typography color={'#fff'} fontSize={'20px'} marginTop={'20px'}>
                  Welcome back to the TODOS Application! We`re glad to see you return and continue organizing your tasks effortlessly.
                </Typography>
              </Box>
            </Box>
          </Container>
        </Box>
        <FormAuth>
          <FormWrapper>
            <>
              <Typography component="h1" variant="h5" color={'#1976d2'}>
                          Login
              </Typography>

              <Box component="form"
                className={'AuthForm'}
                onSubmit={handleSubmit(onSubmit)}
                noValidate sx={{mt: 1}}>
                <LoginInputs control={control}/>
                <ErrorMessage/>

                <SubmitButton control={control} pending={isPending}>
                              Login
                </SubmitButton>

                <SignInWithGoogle/>
                <FormLink to='/sign-up'>
                  {'Don`t have an account? Sign Up'}
                </FormLink>
              </Box>

              <LoadingIndicator isPending={isPending} showingSuccess={isSuccess}/>

            </>
          </FormWrapper>
        </FormAuth>
      </Box>
    </Box>
  );
}

const welcomeBackBlock = {
  width: '50%',
  display: {mobile: 'none', largeMobile: 'none', tablet: 'block'},
  height: '100vh',
  backgroundImage: 'url("/loginPageImage.jpg")',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
}

export default LoginForm;
