import React, {useCallback} from 'react';
import {Box, useTheme} from '@mui/material';
import {ITodo} from '@shared/interfacesAndTypes';
import InfoBoardTitle from '@pages/todos/pages/InfoBoard/components/InfoBoardTitle/InfoBoardTitle';
import {useAppDispatch} from '@app/store';
import {editTaskThunk} from '@entities/todos/store/todoThunks';
import InfoBoardDescription from '@pages/todos/pages/InfoBoard/components/InfoBoardDescription/InfoBoardDescription';
import TodoDetailsSection from '@pages/todos/pages/InfoBoard/components/TodoDetailsSection/TodoDetailsSection';
import CompleteHandler from '@pages/todos/pages/InfoBoard/components/completeHandler/CompleteHandler';
import useTodos from '@entities/todos/hooks/useTodos';

interface Props {
  todo: ITodo,
}

const DetailsCard = ({todo}: Props) => {
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const todosApi = useTodos(todo.id)

  const onTodoUpdate = useCallback((updatedTodoValues: Partial<ITodo>) => {
    const updatedTodo = {...todo, ...updatedTodoValues}
    dispatch(editTaskThunk({updatedTodo}))
  }, [todo])

  return (
    <Box bgcolor={theme.background.paper}
      borderRadius={'7px'}>
      <Box display={'flex'}>
        <Box width={'100%'} sx={{wordWrap: 'break-word'}} fontWeight={'bold'}>
          <InfoBoardTitle initValue={todo.label} onTitleChange={onTodoUpdate}/>
          <CompleteHandler isComplete={todo.done} onComplete={todosApi.onComplete}/>
          <InfoBoardDescription onTodoUpdate={onTodoUpdate} initValue={todo.description}/>
          <TodoDetailsSection/>
        </Box>
      </Box>
    </Box>
  );
};


export default DetailsCard;
