import {Box, Drawer, Theme} from '@mui/material';

import DrawerMenu from '@entities/drawer/components/drawerMenu';
import './active.css';
import {styled} from '@mui/material/styles';
import {useState} from 'react';

const DrawerStyles = (theme: Theme) => ({
  'position': 'static',
  'height': '100%',
  'background': theme.background.lightGrey,
  '.css-4t3x6l-MuiPaper-root-MuiDrawer-paper': {
    width: '320px',
  },
  '.css-12i7wg6-MuiPaper-root-MuiDrawer-paper': {
    position: 'unset',
    backgroundColor: 'transparent',
  },
})

const CustomDrawer = styled(Drawer)(({theme}) => ({
  [theme.breakpoints.down(750)]: {
    display: 'none',
  },
  [theme.breakpoints.down(900)]: {
    width: '250px',
  },
  [theme.breakpoints.up(900)]: {
    width: '320px',
  },
}));

const DrawerLaptop = () => {
  const [isOpen] = useState(true)
  return (
    <CustomDrawer variant={'permanent'} sx={DrawerStyles}
      open={isOpen}
      onClose={() => console.log('celck')}>
      <Box paddingTop={'45px'} width={'100%'}>
        <DrawerMenu/>
      </Box>
    </CustomDrawer>
  );
};


export default Drawer;
