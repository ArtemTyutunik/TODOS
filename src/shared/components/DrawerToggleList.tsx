import React from 'react';
import {Box, Typography} from '@mui/material';
import ToggleArrowIcon from '@shared/components/toggleArrowIcon';

interface Props {
    isExpanded: boolean,
    onArrowClick: () => void,
    title: string,
    children?: React.ReactNode
}

const DrawerToggleList = ({isExpanded, onArrowClick, title, children}: Props) => {
  return <Box sx={favoritesWrapper}>
    <Typography sx={(theme) => ({color: theme.text.main, fontSize: '16px'})}>
      {title}
    </Typography>
    <Box display={'flex'} alignItems={'center'}>
      {children}
      <ToggleArrowIcon isExpanded={isExpanded}
        onClick={onArrowClick}
        sx={{transform: 'rotate(180deg)', color: '#808080'}}/>
    </Box>

  </Box>
};

const favoritesWrapper = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 10px',
  marginTop: '25px',
  marginBottom: '10px',
}
export default DrawerToggleList;
