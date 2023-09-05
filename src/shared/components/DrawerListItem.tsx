import React from 'react';
import {Box} from '@mui/material';

interface Props {
    children: React.ReactNode;
    onClick: () => void
}

const FavoriteItemStyles = {
  'margin': '0 10px',
  'position': 'relative',
  'padding': '6px 8px',
  'paddingLeft': '3px',
  'borderRadius': '4px',
  'display': 'flex',
  'justifyContent': 'space-between',
  '& .hover_content': {
    position: 'absolute',
    top: '3px',
    right: '3px',
    zIndex: '100',
    opacity: 0,
  },
  '&:hover': {
    'backgroundColor': 'rgba(0, 0, 0, 0.04)',
    '& .hover_content': {
      opacity: 1,
    },
    '& .todo-count': {
      display: 'none',
    },
  },
  '& .keepActive': {
    'opacity': 1,
  },
  '& .hide-todo-count': {
    'opacity': 0,
  },
}

const DrawerListItem = ({children, onClick}: Props) => {
  return (
    <Box onClick={onClick} sx={FavoriteItemStyles}>
      {children}
    </Box>
  );
};

export default DrawerListItem;
