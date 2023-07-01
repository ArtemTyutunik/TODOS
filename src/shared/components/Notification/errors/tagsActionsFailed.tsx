import React from 'react';
import {Box, Typography} from '@mui/material';
import {ErrorIcon} from '@shared/components/icons';

const TagsActionFailed = ({action}: {action: string}) => {
  return (
    <Box display={'flex'} alignItems={'center'}>
      <ErrorIcon sx={{fontSize: '16px', color: 'red'}}/>
      <Typography ml={'10px'} fontSize={'14px'} color={'#202020'}>
        {`Failed to ${action}. Reload page or try later`}
      </Typography>
    </Box>
  );
};

export default TagsActionFailed;
