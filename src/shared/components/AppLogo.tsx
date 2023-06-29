import React from 'react';
import {SxProps, Theme, Typography} from '@mui/material';


const AppLogo = ({sx}: {sx?: SxProps<Theme>}) => <Typography
  variant="h6"
  noWrap
  component="div"
  sx={sx}
>
      TODOS
</Typography>

export default AppLogo;
