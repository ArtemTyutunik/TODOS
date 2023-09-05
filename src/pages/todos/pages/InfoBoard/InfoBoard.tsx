import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootReducer} from '@shared/interfacesAndTypes';
import DetailsCard from './components/DetailsCard';
import {toggleTaskComplete} from '@entities/todos/store/todo';
import {Box} from '@mui/material';
import {setTodoInfoId} from '@app/store/AppStore';
import InfoBoardActionPanel from '@shared/forms/ui/infoBoardActionPanel';


interface Props {
    id: number | string
}

const InfoBoard = ({id}: Props) => {
  const todos = useSelector((state: RootReducer) => state.todosReducer.todos);
  const dispatch = useDispatch()
  const detailedTodo = todos.find((todo) => todo.id === Number(id))

  const onComplete = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    dispatch(toggleTaskComplete(Number(id)));
  };

  const onClose = () => {
    dispatch(setTodoInfoId(null))
    localStorage.removeItem('todoInfoId')
  }

  return (
    detailedTodo ? ( <Box width={'100%'} height={'100%'}
      sx={{backgroundColor: '#fff'}}
      padding={'10px'}
      borderLeft={'1px solid #e0e0e0'}
    >
      <InfoBoardActionPanel onClose={onClose} projectId={detailedTodo.projectId} todoId={detailedTodo.id}/>
      <DetailsCard todo={detailedTodo!} onComplete={onComplete}/>
    </Box> ) : null
  );
};

export default InfoBoard;
