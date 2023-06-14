import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Box, List, ListItem, ListItemButton, ListItemIcon, Typography} from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import TodayIcon from '@mui/icons-material/Today';
import FilterListIcon from '@mui/icons-material/FilterList';
import {styled} from '@mui/material/styles';
import useTodosCount from '../hooks/useTodosCount';
import {INBOX_LINK, TODAY_LINK, FILTERS_AND_TAGS_LINK} from '@shared/constants';
import TodosCount from '@shared/components/TodosCount';
import {Favorites} from '@features/addToFavorites';
import '../active.css'

const drawerLinks = [
  {label: 'Inbox', linkTo: INBOX_LINK, Icon: () => <InboxIcon sx={{color: '#246fe0'}}/>},
  {label: 'Today', linkTo: TODAY_LINK, Icon: () => <TodayIcon sx={{color: '#058527'}}/>},
  {label: 'Filters and Tags', linkTo: FILTERS_AND_TAGS_LINK, Icon: () => <FilterListIcon sx={{color: '#eb8909'}}/>},
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
  if (url === '/') return TODAY_LINK;

  if (url.includes(TODAY_LINK)) return TODAY_LINK;
  else if (url.includes(INBOX_LINK)) return INBOX_LINK;
  else if (url.includes(FILTERS_AND_TAGS_LINK)) return FILTERS_AND_TAGS_LINK;

  return '';
};

const DrawerMenu = () => {
  const [activeLink, setActiveLink] = useState(configureActiveLink());
  const todosCount = useTodosCount();
  const navigate = useNavigate();
  return (
    <>
      <List sx={{width: '100%', backgroundColor: 'transparent'}}>
        {
          drawerLinks.map((link) => {
            const {label, linkTo, Icon} = link;

            return <ListItem disablePadding key={label} sx={{marginTop: '15px'}}>
              <ListItemButton sx={{padding: '8px',
                margin: '0 10px',
                display: 'flex',
                borderRadius: '4px',
                justifyContent: 'space-between'}}
              className={activeLink === linkTo ? 'active' : ''}
              onClick={() => {
                setActiveLink(linkTo);
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

                <TodosCount>
                  {todosCount[label]}
                </TodosCount>
              </ListItemButton>
            </ListItem>;
          })
        }
      </List>
      <Favorites/>
    </>
  );
};

export default DrawerMenu;
