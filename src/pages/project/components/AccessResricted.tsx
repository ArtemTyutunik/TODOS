import React from 'react';
import {Box, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';

const AccessRestricted = () => {
  return (
    <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} mt={'40px'}>
      <ImageBox/>
      <Typography mt={'20px'} fontSize={'20px'} fontWeight={600}>
          Access required
      </Typography>
      <Typography fontSize={'15px'}>
          Ask for access or go to an account with access
      </Typography>
    </Box>
  );
};


const ImageBox = styled(Box)(() => ({
  width: '300px',
  height: '200px',
  backgroundImage: 'url(/access-restricted.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
}))

export default AccessRestricted;
