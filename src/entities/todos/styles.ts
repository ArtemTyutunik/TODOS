import {Theme} from '@mui/material';

export const TodoContainerStyles = {
  mb: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  cursor: 'pointer',
};

export const TodoFlexboxStyles = {
  display: 'flex',
  alignItems: 'center',
};

export const TodoLabelStyles = {
  fontSize: '20px',
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
