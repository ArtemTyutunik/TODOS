import React from 'react';
import {ListItemButton} from '@mui/material';

interface Props {
    children: React.ReactNode;
    onClick: () => void
}

const FavoriteItemStyles = {
  'margin': '0 10px',
  'padding': '6px 8px',
  'borderRadius': '4px',
  'display': 'flex',
  'justifyContent': 'space-between',
  '& .hover_content': {
    opacity: 0,
  },
  '&:hover': {
    '& .hover_content': {
      opacity: 1,
    },
  },
}

const DrawerListItem = ({children, onClick}: Props) => {
  return (
    <ListItemButton onClick={onClick} sx={FavoriteItemStyles}>
      {children}
    </ListItemButton>
  );
};

export default DrawerListItem;
