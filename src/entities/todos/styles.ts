import {Theme} from '@mui/material';

export const TodoContainerStyles = {
  'mb': '10px',
  'position': 'relative',
  'display': 'flex',
  'borderRadius': '10px',
  'alignItems': 'center',
  'justifyContent': 'space-between',
  '&: hover': {
    '& .ActionsMenu': {
      opacity: 1,
    },
  },
  '& .ActionsMenu': {
    opacity: 0,
    position: 'absolute',
    padding: '0px',
    boxShadow: '-8px 0px 0 0px rgba(250,250, 250, 0.4)',
    top: '0',
    right: '10px',
    zIndex: 5,
    background: '#fff',
  },
};

export const TodoFlexboxStyles = {
  display: 'flex',
  alignItems: 'center',
  cursor: 'default',
  maxWidth: '100%',
  textOverflow: 'ellipsis',
};

export const TodoLabelStyles = {
  fontSize: '17px',
  fontWeight: 400,
  lineHeight: 1.3,
};

export const todoDescriptionStyles = (theme: Theme) => ({
  'fontSize': {mobile: '13px', largeMobile: '16px'},
  'fontWeight': 300,
  'display': 'flex',
  'marginTop': '10px',
  'lineHeight': 1,
  'maxWidth': '100%',
  'overflow': 'hidden',
  'textOverflow': 'ellipsis',
  'color': theme.text.main,
  '& div': {
    'margin': '0 5px',
    'whiteSpace': 'nowrap',
    'textOverflow': 'ellipsis',
  },
});
