import {Box, Typography} from '@mui/material';
import {SuccessIcon} from '@shared/components/Notification/constants';

export default function TodoCreatedNotification() {
  return (
    <Box display={'flex'} alignItems={'center'}>
      <Typography margin={'0 10px'}>
        <SuccessIcon sx={{fontSize: '23px', color: '#A4DB55'}}/>
          Task added
      </Typography>
    </Box>
  )
}


