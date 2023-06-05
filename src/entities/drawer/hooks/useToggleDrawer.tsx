import {useDispatch, useSelector} from 'react-redux';
import {RootReducer} from '@shared/interfacesAndTypes';
import {toggleDrawerOpen} from '@entities/drawer/store';

const useToggleDrawer = (): [boolean, () => void] => {
  const {isOpenDrawer} = useSelector((state: RootReducer) => state.drawerReducer);
  const dispatch = useDispatch()

  const toggleDrawer = () => {
    localStorage.setItem('isDrawerOpen', !isOpenDrawer + '')
    dispatch(toggleDrawerOpen())
  }

  return [isOpenDrawer, toggleDrawer]
}

export default useToggleDrawer;
