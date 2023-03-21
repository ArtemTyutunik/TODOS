import React from 'react';
import TodayIcon from '@mui/icons-material/Today';
import dayjs from 'dayjs';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import {List, ListItem, ListItemButton, ListItemIcon, Typography} from '@mui/material';
import {IDate} from '@shared/interfaces';
import {dateFormat} from '@shared/constants';


type menuItem = {
    label: string,
    Icon: () => React.ReactElement,
    onItemClick: () => void
}

interface Props {
    onSetDate: (date: IDate) => void
}

const DueDateMenuList= ({onSetDate}: Props) => {
  const menuItems: menuItem[] = [
    {
      label: 'Today',
      Icon: () => <TodayIcon fontSize={'small'} sx={{color: '#058527'}}/>,
      onItemClick: () => onSetDate(dayjs().format(dateFormat)),
    },
    {
      label: 'Tomorrow',
      Icon: () => <WbSunnyIcon fontSize={'small'} sx={{color: '#eb8909'}}/>,
      onItemClick: () => {
        const today = dayjs();
        const tomorrow = today.clone().add(1, 'days');
        onSetDate(tomorrow.format(dateFormat));
      },
    },
    {
      label: 'No date',
      Icon: () => <DoNotDisturbIcon fontSize={'small'} sx={(theme) => ({color: theme.text.main})}/>,
      onItemClick: () => onSetDate(undefined),
    }];

  return (
    <List>
      {menuItems.map(({label, Icon, onItemClick}) => (
        <ListItem
          key={label}
          onClick={onItemClick}
          sx={{padding: 0, mb: '10px'}}
        >
          <ListItemButton sx={{padding: '5px 0 5px 16px'}}>
            <ListItemIcon>
              <Icon/>
            </ListItemIcon>
            <Typography fontSize={'14px'}>
              {label}
            </Typography>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default DueDateMenuList;
