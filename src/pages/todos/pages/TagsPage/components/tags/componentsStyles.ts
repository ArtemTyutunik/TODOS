import {Theme} from '@mui/material';

export const arrowIconStyles = (theme: Theme) => ({
  'position': 'absolute',
  'left': '-25px',
  'color': theme.background.icons,
})

export const tagItemContainer = {
  'display': 'flex',
  'position': 'relative',
  'alignItems': 'center',
  'justifyContent': 'space-between',
  'padding': '8px 0',
  'mt': '5px',
  'cursor': 'pointer',
  'borderBottom': '1px solid rgba(0, 0, 0, 0.12)',
  '&:hover': {
    '.tag_actions': {
      opacity: 1,
    },
  },
}

export const tagActionStyles = (theme: Theme) => ({
  position: 'absolute',
  backgroundColor: theme.background.appBackground,
  opacity: 0,
  zIndex: 9,
  top: 0,
  right: 0,
})

export const iconStyles = (theme: Theme) => ({
  color: theme.background.icons,
  fontSize: '20px',
})
