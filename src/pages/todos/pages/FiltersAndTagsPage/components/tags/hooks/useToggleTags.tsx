import {useDispatch, useSelector} from 'react-redux';
import {RootReducer} from '@shared/interfacesAndTypes';
import {toggleTagListOpen} from '../store/index';

const useToggleTags = (): [boolean, () => void] => {
  const {isOpenTagList} = useSelector((state: RootReducer) => state.tagListReducer);
  const dispatch = useDispatch()

  const toggleTagList = () => {
    localStorage.setItem('isTagListOpen', !isOpenTagList + '')
    dispatch(toggleTagListOpen())
  }

  return [isOpenTagList, toggleTagList]
}

export default useToggleTags;
