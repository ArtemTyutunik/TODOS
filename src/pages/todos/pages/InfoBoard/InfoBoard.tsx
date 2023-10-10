import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootReducer} from '@shared/interfacesAndTypes';
import DetailsCard from './components/DetailsCard/DetailsCard';
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

  const onClose = () => {
    dispatch(setTodoInfoId(null))
    localStorage.removeItem('todoInfoId')
  }

  return (
    detailedTodo ? ( <Box width={'100%'} height={'100%'} maxHeight={'100vh'} overflow={'scroll'}
      sx={{backgroundColor: '#fff'}}
      padding={'10px'}
      borderLeft={'1px solid #e0e0e0'}
    >
      <InfoBoardActionPanel onClose={onClose} projectId={detailedTodo.projectId} todoId={detailedTodo.id}/>
      <DetailsCard todo={detailedTodo!}/>
    </Box> ) : null
  );
};

export default InfoBoard;
