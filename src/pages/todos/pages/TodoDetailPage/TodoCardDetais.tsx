import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootReducer} from '@app/store';
import {useParams} from 'react-router-dom';
import BasicModal from '@shared/components/modal';
import DetailsCard from './DetailsCard';
import {toggleTaskComplete} from '@entities/todos/store/todo';

const TodoDetailPage = () => {
  const {id} = useParams()
  const todos = useSelector((state: RootReducer) => state.todosReducer.todos);
  const dispatch = useDispatch()
  const detailedTodo = todos.find( (todo) => todo.id === Number(id))

  const onComplete = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    dispatch(toggleTaskComplete(Number(id)));
  };

  return (
    detailedTodo ?
    <BasicModal open={true} onClose={()=>{
      window.history.back()
    }}>
      <DetailsCard todo={detailedTodo!} onComplete={onComplete}/>
    </BasicModal> : null
  );
};

export default TodoDetailPage;
