import {Box, Drawer, Theme} from '@mui/material';
import {styled} from '@mui/material/styles';
import DrawerMenu from '@entities/drawer/components/drawerMenu';
import '../active.css';


const LaptopDrawerStyles = (theme: Theme) => ({
  'display': {largeMobile: 'none', tablet: 'block'},
  'position': 'static',
  'height': '100%',
  'background': theme.background.lightGrey,
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
  return (
    <CustomDrawer variant={'permanent'} sx={LaptopDrawerStyles}>
      <Box paddingTop={'45px'} width={'100%'}>
        <DrawerMenu/>
      </Box>
    </CustomDrawer>
  );
};


export default DrawerLaptop;
