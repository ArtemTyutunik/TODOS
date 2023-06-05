import {useState} from 'react';
import {Priority} from '@shared/interfacesAndTypes';
import {SelectChangeEvent} from '@mui/material';


const useSelectPriority = (initialValue?: Priority): [Priority | undefined, (event: SelectChangeEvent<Priority>) => void ] => {
  const [priority, setPriority] = useState<Priority | undefined>(initialValue)

  const onSelected = (event: SelectChangeEvent<Priority>) => {
    // @ts-ignore
    setPriority(event.target.value)
  }

  return [priority, onSelected]
}

export default useSelectPriority;
