import {alpha, styled} from '@mui/material/styles';

export const CustomSearch = styled('div')(({theme}) => ({
  'position': 'relative',
  'borderRadius': theme.shape.borderRadius,
  'backgroundColor': alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  'marginRight': theme.spacing(1),
  'marginLeft': 0,
  'width': '100%',
  [theme.breakpoints.up('mobile')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));
