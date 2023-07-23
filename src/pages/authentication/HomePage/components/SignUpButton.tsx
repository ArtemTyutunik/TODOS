import React from 'react';
import {Link} from 'react-router-dom';
import {Box} from '@mui/material';

const SignUpButton = () => {
  return <Box sx={signUpLink}>
    <Link to={'/sign-up'}>
          Start for free
    </Link>
  </Box>
};

const signUpLink = {
  'marginLeft': '15px',
  'maxWidth': 'fit-content',
  'cursor': 'pointer',
  'padding': '3px 15px',
  'borderRadius': '8px',
  'color': '#fff',
  'background': '#1976D2',
  '&: hover': {
    opacity: 0.95,
  },
}

export default SignUpButton;
