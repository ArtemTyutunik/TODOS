import {Theme} from '@mui/material';

export const TodoContainerStyles = {
  'mb': '10px',
  'position': 'relative',
  'display': 'flex',
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
    top: 0,
    right: 0,
    zIndex: 5,
    background: '#fff',
  },
};

export const TodoFlexboxStyles = {
  display: 'flex',
  alignItems: 'center',
  cursor: 'default',
};

export const TodoLabelStyles = {
  fontSize: '17px',
  fontWeight: 400,
  lineHeight: 1.3,
};

export const todoDescriptionStyles = (theme: Theme) => ({
  fontSize: {mobile: '13px', largeMobile: '16px'},
  fontWeight: 300,
  lineHeight: 1,
  color: theme.text.main,
  paddingLeft: '42px',
});
