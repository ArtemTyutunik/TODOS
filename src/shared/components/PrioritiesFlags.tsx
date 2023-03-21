import FlagIcon from '@mui/icons-material/Flag';
import React from 'react';

const FontSize = '19px'
export const PrioritiesFlags = [
  {value: '1', Icon: () => <FlagIcon sx={(theme) => ({color: theme.priority.first, fontSize: FontSize})}/>},
  {value: '2', Icon: () => <FlagIcon sx={(theme) => ({color: theme.priority.second, fontSize: FontSize})}/>},
  {value: '3', Icon: () => <FlagIcon sx={(theme) => ({color: theme.priority.third, fontSize: FontSize})}/>},
  {value: '4', Icon: () => <FlagIcon sx={(theme) => ({color: theme.priority.fourth, fontSize: FontSize})}/>},
];
