import React from 'react';
import {ITodo} from '@shared/interfacesAndTypes';
import Todo from '@entities/todos/components/todo/todo';
import {Box, Checkbox} from '@mui/material';


interface Props {
  todos: ITodo[],
  onChooseTodo?: (id: ITodo['id']) => void,
  chosenTodos?: ITodo['id'][]
}
const RenderedList = ({todos, onChooseTodo, chosenTodos}: Props) => {
  return (
    <>
      {
        todos.map((todo: ITodo) => <Box key={todo.id} sx={todoWrapper}>
          <Checkbox sx={checkboxStyles} size={'small'} checked={chosenTodos?.includes(todo.id)}
            onChange={() => onChooseTodo && onChooseTodo(todo.id)}
            className={`todo-checkbox ${chosenTodos?.includes(todo.id) ? 'keep-active': ''}`}/>
          <Todo todo={todo} />
        </Box>)
      }
    </>
  );
};

const todoWrapper = {
  'position': 'relative',
  'display': 'flex',
  '&: hover': {
    '& .todo-checkbox': {
      visibility: 'visible',
    },
  },
  '& .keep-active': {
    visibility: 'visible !important',
  },
}
const checkboxStyles = {
  color: '#808080',
  position: 'absolute',
  visibility: 'hidden',
  zIndex: '10',
  top: 'calc(50% - 20px)',
  left: '0%',
  transform: 'translate(-100%, -50%)',
}

export default RenderedList;
