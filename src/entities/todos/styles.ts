import {Theme} from '@mui/material';

export const TodoContainerStyles = (theme: Theme) => ({
  'mb': '10px',
  'position': 'relative',
  'background': theme.background.visibleBackground,
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
    top: '20%',
    right: '10px',
    zIndex: 5,
    background: '#fff',
  },
});

export const TodoFlexboxStyles = {
  display: 'flex',
  alignItems: 'center',
  cursor: 'default',
};

export const TodoLabelStyles = (theme: Theme) => ({
  fontSize: '17px',
  fontWeight: 400,
  lineHeight: 1.3,
  color: theme.text.main,
});

export const todoDescriptionStyles = (theme: Theme) => ({
  fontSize: {mobile: '13px', largeMobile: '16px'},
  fontWeight: 300,
  lineHeight: 1,
  color: theme.text.main,
});
