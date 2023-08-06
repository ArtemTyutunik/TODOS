import {Box, Drawer, Theme} from '@mui/material';
import {styled} from '@mui/material/styles';
import DrawerMenu from './drawerMenu';
import '../active.css';


const LaptopDrawerStyles = (theme: Theme) => ({
  'display': {largeMobile: 'none', tablet: 'block'},
  'position': 'static',
  'height': '100%',
  'background': theme.background.lightGrey,
  '.css-12i7wg6-MuiPaper-root-MuiDrawer-paper, .css-1l8j5k8': {
    position: 'unset',
    backgroundColor: 'transparent',
  },
})

const CustomDrawer = styled(Drawer)(({theme}) => ({
  draggable: 'none',
  [theme.breakpoints.down(750)]: {
    display: 'none',
  },
}));

const DrawerLaptop = () => {
  return (
    <CustomDrawer variant={'permanent'} sx={LaptopDrawerStyles}>
      <Box paddingTop={'45px'} width={'100%'}>
        <DrawerMenu/>
      </Box>
    </CustomDrawer>
  );
};


export default DrawerLaptop;
