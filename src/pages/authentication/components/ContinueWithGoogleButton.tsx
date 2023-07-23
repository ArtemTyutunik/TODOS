import React from 'react';
import {Box, Typography} from '@mui/material';

const ContinueWithGoogleButton = ({clickHandler}: {clickHandler: () => void}) => {
  return (
    <Box sx={buttonWrapperStyles} onClick={clickHandler}>
      <Box width={'fit-content'}
        display={'flex'}
        margin={'0 auto'}
        alignItems={'center'}
      >
        <img src={'./google.svg'} width={'24px'} height={'24px'} alt={'goggle icon'}/>
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

export default ContinueWithGoogleButton;
