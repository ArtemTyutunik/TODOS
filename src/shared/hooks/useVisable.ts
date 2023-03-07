import {useState} from 'react';


const useVisable = (isVisible: boolean): [boolean, () => void, () => void] => {
  const [visable, setVisable] = useState(isVisible)

  const show = () => {
    setVisable(true)
  }

  const hide = () => {
    setVisable(false)
  }

  return [visable, show, hide]
}

export default useVisable;
