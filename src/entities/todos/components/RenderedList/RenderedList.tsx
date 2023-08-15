import React from 'react';
import {ITodo} from '@shared/interfacesAndTypes';
import Todo from '@entities/todos/components/todo/todo';
import {Box, Checkbox, Theme, useTheme} from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';


interface Props {
  todos: ITodo[],
  onChooseTodo?: (id: ITodo['id']) => void,
  chosenTodos?: ITodo['id'][]
}
const RenderedList = ({todos, onChooseTodo, chosenTodos}: Props) => {
  const theme = useTheme()
  return (
    <>
      {
        todos.map((todo: ITodo) => <Box key={todo.id} sx={todoWrapper}>
          <Checkbox sx={checkboxStyles} size={'small'} checked={chosenTodos?.includes(todo.id)}
            checkedIcon={<CheckBoxIcon sx={{color: theme.background.icons, padding: '0'}}/>}
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
const checkboxStyles = (theme: Theme) => ({
  color: theme.background.icons,
  position: 'absolute',
  visibility: 'hidden',
  zIndex: '10',
  top: 'calc(50% - 20px)',
  left: '0%',
  transform: 'translate(-100%, -50%)',
})

export default RenderedList;
