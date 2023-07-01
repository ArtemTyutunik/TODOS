import {useState} from 'react';
import {useDispatch} from 'react-redux';

import {IDate} from '@shared/interfacesAndTypes';
import {dispatchNewDate} from '@entities/todos/store/todo';

export const useTodoDate =
    (initialTodoTade: IDate, id: number ) : [IDate, (newDate: IDate) => void] => {
      const [date, setDate] = useState(initialTodoTade)
      const dispatch = useDispatch();

      const setNewDate = (newDate: IDate) => {
        setDate(newDate)
        dispatch(dispatchNewDate({newDate, id}))
      };

      return [date, setNewDate]
    }
