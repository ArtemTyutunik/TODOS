import {Box, Typography} from '@mui/material';
import {SuccessIcon} from '@shared/components/Notification/constants';

export default function TodoCreatedNotification() {
  return (
    <Box display={'flex'} alignItems={'center'}>
      <SuccessIcon sx={{fontSize: '23px', color: '#A4DB55'}}/>
      <Typography margin={'0 10px'}>
          Task added
      </Typography>
    </Box>
  )
}


