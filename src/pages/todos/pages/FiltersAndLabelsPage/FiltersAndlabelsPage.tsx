import {Box, Typography, useTheme} from '@mui/material';
import React from 'react';


const FilterAndLabelsPage = () => {
  const imgUrl = 'https://d3ptyyxy2at9ui.cloudfront.net/assets/images/2501ba1c4829d47f4193a8f75efc2350.jpg'
  const theme = useTheme();
  return (
    <Box>
      <Box height={'auto'} display={'flex'} maxWidth={'360px'} margin={'0 auto'}>
        <Box display={'flex'} flexDirection={'column'} margin={'0 auto'} alignItems={'center'}>
          <img src={imgUrl} alt={'image'}/>
          <Typography fontWeight={600} fontSize={'20px'} color={theme.description}>
              This page is still under development
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default FilterAndLabelsPage;
