import {Box, Drawer} from '@mui/material';

import DrawerMenu from './drawerMenu';
import useToggleDrawer from '../hooks/useToggleDrawer';
import AppLogo from '@shared/components/AppLogo';

const MobileDrawerStyles = {
  'display': {largeMobile: 'block', tablet: 'none'},
  '.css-4t3x6l-MuiPaper-root-MuiDrawer-paper, .css-wf16b5': {
    width: '320px',
    paddingTop: '54px',
  },
}

const MobileDrawer = () => {
  const [isOpenDrawer, toggleDrawer] = useToggleDrawer();

  return (
    <Drawer variant={'temporary'}
      sx={MobileDrawerStyles}
      open={isOpenDrawer}
      onClose={toggleDrawer}
    >
      <Box>
        <AppLogo sx={(theme) => ({color: theme.palette.primary.main, marginLeft: '18px'})}/>
        <DrawerMenu/>
      </Box>
    </Drawer>)
}


export default MobileDrawer;
