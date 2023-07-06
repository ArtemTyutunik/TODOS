import React from 'react';
import {Box, Typography} from '@mui/material';
import {useGoogleLogin} from '@react-oauth/google';
import {signUpWithGoogleService} from '@shared/api/services/authorization';

const SignInWithGoogle = () => {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userAccount = await (await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            'Authorization': `Bearer ${tokenResponse.access_token}`,
          },
        })).json()

        const {email, picture, name} = userAccount

        const user = await signUpWithGoogleService(email, {picture, name})

        console.log(user)
      } catch (e) {
        console.log(e)
      }
    },
  });

  return (
    <Box sx={buttonWrapperStyles} onClick={() => login()}>
      <Box width={'fit-content'}
        display={'flex'}
        margin={'0 auto'}
        alignItems={'center'}
      >
        <img src={'./google.svg'} width={'24px'} height={'24px'}/>
        <Typography ml={'15px'}>
          Continue with Google
        </Typography>
      </Box>
    </Box>
  );
};

const buttonWrapperStyles = {
  'minWidth': '100%',
  'margin': '10px auto',
  'marginBottom': '20px',
  'border': '1px solid rgba(0, 0, 0, 0.23)',
  'borderRadius': '7px',
  'padding': '10px 0',
  'cursor': 'pointer',

  '&: hover': {
    background: '#EEEEEE',
    transition: 'background linear .3s',
  },
}

//await fetch('https://www.googleapis.com/auth/oauth2/v3/userinfo', {
//   headers: {
//     'Authorization': 'Bearer ' + tokenResponse.access_token,
//   },
// })

// const hasAccess = hasGrantedAnyScopeGoogle(
//     tokenResponse,
//     'https://www.googleapis.com/auth/userinfo.profile',
//     'https://www.googleapis.com/auth/userinfo.email',
// );

export default SignInWithGoogle;
