import {Box, Typography} from '@mui/material';
import React from 'react';


const FilterAndLabelsPage = () => {
  const imgUrl = 'https://d3ptyyxy2at9ui.cloudfront.net/assets/images/2501ba1c4829d47f4193a8f75efc2350.jpg'
  return (
    <Box>
      <Box height={'auto'} display={'flex'} maxWidth={'360px'} margin={'0 auto'}>
        <Box display={'flex'} flexDirection={'column'} margin={'0 auto'} alignItems={'center'}>
          <img src={imgUrl} alt={'image'}/>
          <Typography fontWeight={600} color={'#515761'} fontSize={'20px'}>
              This page is still under development
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default FilterAndLabelsPage;
