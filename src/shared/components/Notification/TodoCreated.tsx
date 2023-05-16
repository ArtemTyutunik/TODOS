import {Box, Button, Link as MuiLink, Typography} from '@mui/material';
import {Link as RouterLink} from 'react-router-dom';

export default function TodoCreatedNotification({onNavigate}: {onNavigate: () => void}) {
  return (
    <Box display={'flex'} alignItems={'center'}>
      <Typography marginRight={'10px'}>
          Task added to <MuiLink component={RouterLink} color={'primary.main'} sx={{textDecoration: 'none'}} to={'/Inbox'} >
          Inbox
        </MuiLink>
      </Typography>
      <Button sx={{textTransform: 'none', marginTop: '-2px'}} onClick={onNavigate}>
          Open
      </Button>
    </Box>
  )
}


