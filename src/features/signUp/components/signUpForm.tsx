import React, {FC} from 'react';
import {useForm} from 'react-hook-form';
import {Box, CssBaseline, Typography} from '@mui/material';
import {IFormInputs, IInputsProps} from '@shared/forms/interfaces/interfaces';
import FormInputs from '@features/signUp/components/FormInputs';
import SubmitButton from '@shared/forms/authorization/SubmitButton';
import FromLink from '@shared/forms/authorization/FormLink';
import FormWrapper from '@shared/forms/authorization/FormWrapper';
import ErrorMessage from '@shared/forms/authorization/ErrorMessage';
import AppLogo from '@shared/components/AppLogo';

const SignUpForm:FC<IInputsProps> = ({onSubmit}) => {
  const {handleSubmit, control} = useForm<IFormInputs>({mode: 'onChange'});

  return <Box>
    <Box display={'flex'} alignItems={'center'}>
      <Box width={'50%'} display={{mobile: 'none', largeMobile: 'none', tablet: 'block'}}>
        <AppLogo sx={{color: '#1976d2', marginTop: '20px', marginLeft: '20px'}}/>
        <Box sx={welcomeBackBlock}>
        </Box>
      </Box>
      <Box display={'flex'} margin={'0 auto'} marginTop={'40px'}
        maxWidth={{tablet: '35%', laptop: 'fit-content'}}
        padding={'0 10px'}>
        <CssBaseline />
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
              <SubmitButton control={control}>
                    Sign up
              </SubmitButton>
              <FromLink to={'/login'}>
                    Have account? Login
              </FromLink>
            </Box>
          </>
        </FormWrapper>
      </Box>
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
