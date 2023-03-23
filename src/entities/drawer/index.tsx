import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {styled} from '@mui/material/styles';

import {Box, List, ListItem, ListItemButton, ListItemIcon, Typography} from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import TodayIcon from '@mui/icons-material/Today';
import {default as ParamsIcon} from '@mui/icons-material/Apps';
import {RootReducer} from '@app/store';

import './active.css';

const CustomListText = styled(Typography)(({theme}) => ({
  [theme.breakpoints.down(450)]: {
    fontSize: '20px',
  },
  [theme.breakpoints.up(450)]: {
    fontSize: '18px',
  },
}));

const inboxLink = 'inbox';
const todayLink = 'today';
const filtersAndLabelsLink = 'filters-and-labels';

const configureActiveLink = (): string => {
  const url = window.location.pathname;
  if (url === '/') return todayLink;

  if (url.includes(todayLink)) return todayLink;
  else if (url.includes(inboxLink)) return inboxLink;
  else if (url.includes(filtersAndLabelsLink)) return filtersAndLabelsLink;

  return '';
};

const Drawer = () => {
  const {isOpenDrawer} = useSelector((state: RootReducer) => state.drawerReducer);
  localStorage.setItem('isDrawerOpen', isOpenDrawer.toString());
  const [activeLink, setActiveLink] = useState(configureActiveLink());
  const navigate = useNavigate();

  const CustomBox = styled(Box)(({theme}) => ({
    position: 'static',
    display: 'flex',
    width: '250px',
    height: '100%',
    background: theme.background.lightGrey,
    opacity: isOpenDrawer ? 0 : 1,
    visibility: isOpenDrawer ? 'hidden' : 'visible',
    [theme.breakpoints.down(450)]: {
      width: '100%',
    },
    [theme.breakpoints.up(600)]: {
      width: '250px',
    },
    [theme.breakpoints.up(900)]: {
      width: '320px',
    },
  }));

  const drawerLinks = [
    {label: 'Inbox', linkTo: inboxLink, Icon: () => <InboxIcon/>},
    {label: 'Today', linkTo: todayLink, Icon: () => <TodayIcon/>},
    {label: 'Filters and labels', linkTo: filtersAndLabelsLink, Icon: () => <ParamsIcon/>},
  ];

  return (
    <CustomBox>
      <Box paddingTop={'45px'} width={'100%'}>
        <List>
          {
            drawerLinks.map( (link: {label: string, linkTo: string, Icon:() => React.ReactElement}) => {
              const {label, linkTo, Icon} = link;
              return <ListItem disablePadding key={label}>
                <ListItemButton sx={{padding: '8px', margin: '0 10px'}}
                  className={activeLink === linkTo ? 'active' : ''}
                  onClick={() => {
                    setActiveLink(label);
                    navigate(linkTo);
                  }}>
                  <ListItemIcon>
                    <Icon/>
                  </ListItemIcon>
                  <CustomListText>
                    {label}
                  </CustomListText>
                </ListItemButton>
              </ListItem>;
            })
          }
        </List>
      </Box>
    </CustomBox>
  );
};


export default Drawer;
