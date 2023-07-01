import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootReducer} from '@shared/interfacesAndTypes';
import BasicModal from '@shared/components/modal';
import DetailsCard from './components/DetailsCard';
import {toggleTaskComplete} from '@entities/todos/store/todo';


interface Props {
    id: number,
    onClose(): void,
  isOpen: boolean
}
const TodoDetailPage = ({id, onClose, isOpen}: Props) => {
  const todos = useSelector((state: RootReducer) => state.todosReducer.todos);
  const dispatch = useDispatch()
  const detailedTodo = todos.find((todo) => todo.id === Number(id))

  const onComplete = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    dispatch(toggleTaskComplete(Number(id)));
  };

  return (
    detailedTodo ?
    <BasicModal open={isOpen} onClose={onClose}>
      <DetailsCard todo={detailedTodo!} onComplete={onComplete}/>
    </BasicModal> : null
  );
};

export default TodoDetailPage;
