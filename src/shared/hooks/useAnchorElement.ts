import {useState} from 'react';
import {Anchor} from '@shared/interfacesAndTypes';

const useAnchorElement = (initialValue: Anchor):
    [Anchor, (newAnchorEl: Anchor) => void, () => void] => {
  const [anchorEl, setAnchorEl] = useState(initialValue)

  const addAnchorEl = (newAnchorEl: Anchor) => {
    setAnchorEl(newAnchorEl)
  }

  const removeAnchorEl = () => {
    setAnchorEl(null)
  }

  return [anchorEl, addAnchorEl, removeAnchorEl]
}

export default useAnchorElement;
