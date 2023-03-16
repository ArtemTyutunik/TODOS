import FlagIcon from '@mui/icons-material/Flag';
import React from 'react';

const FontSize = '19px'
export const PrioritiesFlags = [
  {value: '1', Icon: () => <FlagIcon sx={{color: '#cc2a25', fontSize: FontSize}}/>},
  {value: '2', Icon: () => <FlagIcon sx={{color: '#ff824d', fontSize: FontSize}}/>},
  {value: '3', Icon: () => <FlagIcon sx={{color: '#1531d1', fontSize: FontSize}}/>},
  {value: '4', Icon: () => <FlagIcon sx={{color: '#babbc2', fontSize: FontSize}}/>},
];
