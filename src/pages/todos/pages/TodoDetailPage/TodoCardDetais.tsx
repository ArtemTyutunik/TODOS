import React from 'react';
import {useSelector} from 'react-redux';
import {RootReducer} from '../../../../app/store';
import {useParams} from 'react-router-dom';
import BasicModal from '../../../../shared/components/modal';
import DetailsCard from './DetailsCard';

const TodoDetailPage = () => {
  const {id} = useParams()
  const todos = useSelector((state: RootReducer) => state.todosReducer.todos);
  const detailedTodo = todos.find( (todo) => todo.id === Number(id))

  return (
    detailedTodo ?
    <BasicModal open={true} onClose={()=>{
      window.history.back()
    }}>
      <DetailsCard todo={detailedTodo!}/>
    </BasicModal> : null
  );
};

export default TodoDetailPage;
