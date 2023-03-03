import {useState} from 'react';
import {useDispatch} from 'react-redux';

import {IDate} from '@shared/interfaces';
import {dispatchNewDate} from '@entities/todos/store/todo';

export const useTodoDate =
    (initialTodoTade: IDate, id: number | undefined) : [IDate, (newDate: IDate) => void] => {
      const [date, setDate] = useState(initialTodoTade)
      const dispatch = useDispatch();

      const setNewDate = (newDate: IDate) => {
        setDate(newDate)
        dispatch(dispatchNewDate({newDate, id}))
      };

      return [date, setNewDate]
    }
