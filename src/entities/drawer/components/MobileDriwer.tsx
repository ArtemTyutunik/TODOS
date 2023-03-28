import {useDispatch, useSelector} from 'react-redux';
import {Box, Drawer, Typography} from '@mui/material';

import DrawerMenu from '@entities/drawer/components/drawerMenu';
import {RootReducer} from '@app/store';
import {toggleDrawerOpen} from '@entities/drawer/store';

const MobileDrawerStyles = {
  'display': {largeMobile: 'block', tablet: 'none'},
  '.css-4t3x6l-MuiPaper-root-MuiDrawer-paper': {
    width: '320px',
    paddingTop: '54px',
  },
}

const MobileDrawer = () => {
  const {isOpenDrawer} = useSelector((state: RootReducer) => state.drawerReducer);
  const dispatch = useDispatch()

  const onCloseHandler = () => {
    dispatch(toggleDrawerOpen())
  }

  return (
    <Drawer variant={'temporary'}
      sx={MobileDrawerStyles}
      open={isOpenDrawer}
      onClose={onCloseHandler}
    >
      <Box>
        <Typography
          variant="h6"
          noWrap
          component="div"
          marginLeft={'18px'}
          sx={(theme) => ({color: theme.palette.primary.main})}
        >
          TODOS
        </Typography>
        <DrawerMenu/>
      </Box>
    </Drawer>)
}


export default MobileDrawer;
