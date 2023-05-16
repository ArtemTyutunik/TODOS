import {Box, Typography} from '@mui/material';


export default function TodoEditedNotification() {
  return (
    <Box display={'flex'} alignItems={'center'}>
      <Typography marginRight={'10px'}>
        Task successfully edited
      </Typography>
    </Box>
  )
}
