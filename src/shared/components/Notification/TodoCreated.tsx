import {Box, Typography} from '@mui/material';

export default function TodoCreatedNotification() {
  return (
    <Box display={'flex'} alignItems={'center'}>
      <Typography marginRight={'10px'}>
          Task added
      </Typography>
    </Box>
  )
}


