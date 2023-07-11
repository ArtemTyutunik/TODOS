import React, {memo, useState} from 'react';
import {Box, Checkbox, Tooltip} from '@mui/material';
import {IDate, ITodo} from '@shared/interfacesAndTypes';
import CreateTodoForm from '@features/todoFeatures/CreateTodo/components/createTodoForm';
import AddTaskButton from '@features/todoFeatures/CreateTodo/components/AddTaskButton';
import RenderedList from '@entities/todos/components/RenderedList';
import {useAnchorElement, useVisable} from '@shared/hooks';
import CustomIconButton from '@shared/components/CustomIconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SelectTodosMenu from '@pages/todos/components/SelectTodosMenu';
import SelectedTodosActions from '@pages/todos/components/SelectedTodosActions';

interface Props {
    todos: ITodo[],
    initialDate?: IDate,
    initialProject?: string,
    noAddButton?:boolean,
    children?: React.ReactElement
}

// eslint-disable-next-line react/display-name
const TodoList = memo(({todos, initialDate, initialProject, noAddButton = false, children}: Props) => {
  const [isOpenForm, openForm, closeForm] = useVisable(false);
  const [chosenTodos, setChosenTodos] = useState<ITodo['id'][]>([])
  const [allSelected, setAllSelected] = useState<boolean>(false)
  const [anchorEl, setAnchorAll, removeAnchorEl] = useAnchorElement(null)

  const toggleSelectAllTodos = (isAllTodosSelected: boolean) => {
    setAllSelected(isAllTodosSelected)
    setChosenTodos(isAllTodosSelected ? todos.map((todo) => todo.id) : [])
  }

  const toggleChosenTodo = (id: ITodo['id']) => {
    setChosenTodos((prevState) => {
      return prevState.includes(id) ? prevState.filter((item) => item !== id) :
          [...prevState, id]
    })
  }


  const form = isOpenForm ? (
          <Box mt={'20px'}>
            <CreateTodoForm onClose={closeForm} initialDate={initialDate} initialProject={initialProject}/>
          </Box>
      ) : !noAddButton && <AddTaskButton onCreate={openForm}/>

  return (
    <Box mt={'20px'} paddingBottom={'20px'}>
      <Box display={'flex'} alignItems={'center'} justifyContent={children ? 'space-between' : 'flex-end'} mb={'10px'}>
        {children}
        <Box display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
          {
            chosenTodos.length > 0 && <>
              <SelectedTodosActions selectedTodos={chosenTodos}/>
            </>
          }

          <Box display={'flex'} alignItems={'center'} ml={'15px'}>
            <Tooltip title={'Choose all'}>
              <CustomIconButton>
                <Checkbox sx={{color: '#808080', padding: '0'}}
                  size={'small'}
                  checked={allSelected}
                  disableRipple
                  onChange={() => toggleSelectAllTodos(!allSelected)}/>
              </CustomIconButton>
            </Tooltip>

            <ChevronRightIcon sx={{transform: 'rotate(90deg)',
              color: '#808080',
              fontSize: '20px',
              cursor: 'pointer'}}
            onClick={(e: React.SyntheticEvent) => setAnchorAll(e.target as HTMLElement)}/>

            <SelectTodosMenu anchorEl={anchorEl}
              removeAnchorEl={removeAnchorEl}
              todos={todos}
              setChosenTodos={setChosenTodos}
            />
          </Box>
        </Box>
      </Box>
      <RenderedList todos={todos} onChooseTodo={toggleChosenTodo} chosenTodos={chosenTodos}/>
      {form}
    </Box>
  );
});


export default TodoList;
