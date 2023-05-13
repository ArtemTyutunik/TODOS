import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Box, List, ListItem, ListItemButton, ListItemIcon, Typography} from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import TodayIcon from '@mui/icons-material/Today';
import FilterListIcon from '@mui/icons-material/FilterList';
import {styled} from '@mui/material/styles';
import useTodosCount from '@entities/drawer/hooks/useTodosCount';

const inboxLink = 'inbox';
const todayLink = 'today';
const filtersAndLabelsLink = 'filters-and-labels';


const drawerLinks = [
  {label: 'Inbox', linkTo: inboxLink, Icon: () => <InboxIcon/>},
  {label: 'Today', linkTo: todayLink, Icon: () => <TodayIcon/>},
  {label: 'Filters and labels', linkTo: filtersAndLabelsLink, Icon: () => <FilterListIcon/>},
];

const CustomListText = styled(Typography)(({theme}) => ({
  [theme.breakpoints.down(450)]: {
    fontSize: '20px',
  },
  [theme.breakpoints.up(450)]: {
    fontSize: '18px',
  },
}));

const configureActiveLink = (): string => {
  const url = window.location.pathname;
  if (url === '/') return todayLink;

  if (url.includes(todayLink)) return todayLink;
  else if (url.includes(inboxLink)) return inboxLink;
  else if (url.includes(filtersAndLabelsLink)) return filtersAndLabelsLink;

  return '';
};

const DrawerMenu = () => {
  const [activeLink, setActiveLink] = useState(configureActiveLink());
  const todosCount = useTodosCount();
  const navigate = useNavigate();
  return (
    <List sx={{width: '100%', backgroundColor: 'transparent'}}>
      {
        drawerLinks.map((link) => {
          const {label, linkTo, Icon} = link;

          return <ListItem disablePadding key={label} sx={{marginTop: '15px'}}>
            <ListItemButton sx={{padding: '8px',
              margin: '0 10px',
              display: 'flex',
              justifyContent: 'space-between'}}
            className={activeLink === linkTo ? 'active' : ''}
            onClick={() => {
              setActiveLink(label);
              navigate(linkTo);
            }}>
              <Box display={'flex'}>
                <ListItemIcon>
                  <Icon/>
                </ListItemIcon>
                <CustomListText>
                  {label}
                </CustomListText>
              </Box>

              <Typography color={'#aaa'} fontSize={'13px'}>
                {/*Fixme*/}
                {/*@ts-ignore*/}
                {todosCount[label]}
              </Typography>
            </ListItemButton>
          </ListItem>;
        })
      }
    </List>
  );
};

export default DrawerMenu;
