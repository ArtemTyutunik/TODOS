import React, {memo} from 'react';
import {Box} from '@mui/material';
import Resizable from '@shared/components/resizable/Resizable';
import {useSelector} from 'react-redux';
import {RootReducer} from '@app/store';
import LaptopDrawer from './LaptopDrawer';
import MobileDrawer from './MobileDriwer';

const ResizableDrawer = memo(() => {
  const drawerWidth = localStorage.getItem('drawerWidth') || '320px'
  const {isOpenDrawer} = useSelector((state: RootReducer) => state.drawerReducer);

  return isOpenDrawer ? (
      <>
        <Resizable
          width={drawerWidth}
          direction={'right'}
          localStorageItem={'drawerWidth'}
        >
          <Box paddingTop={'0 !important'}
            position={'unset'}
            width={'100%'}
            height={'calc(100vh - 56px)'}
          >
            <LaptopDrawer/>
            <MobileDrawer/>
          </Box>
        </Resizable>
      </>
  ) : null
});

export default ResizableDrawer;
