import React, {memo, useState} from 'react';
import {Box} from '@mui/material';
import {IDate, ITodo} from '@shared/interfacesAndTypes';
import CreateTodoForm from '@features/todoFeatures/CreateTodo/components/createTodoForm';
import AddTaskButton from '@features/todoFeatures/CreateTodo/components/AddTaskButton';
import RenderedList from '@entities/todos/components/RenderedList/RenderedList';
import {useVisable} from '@shared/hooks';
import SelectMenu from '@pages/todos/components/SelectMenu/SelectMenu';
import SortingMenu from '@pages/todos/components/SortMenu/Menu/SortingMenu';
import {useSelector} from 'react-redux';
import {orderSelector, sortTypeSelector} from '@app/store/AppStore';
import {sortTodosByProperty} from '@shared/helpers';

interface Props {
    todos: ITodo[],
    initialDate?: IDate,
    initialProject?: ITodo['projectId'],
    initialTag?: ITodo['tags'],
    noAddButton?:boolean,
    children?: React.ReactElement
}

const TodoList = memo(({todos, initialDate, initialProject, noAddButton = false, children, initialTag}: Props) => {
  const [isOpenForm, openForm, closeForm] = useVisable(false);
  const [chosenTodos, setChosenTodos] = useState<ITodo['id'][]>([])
  const [allSelected, setAllSelected] = useState<boolean>(false)
  const sorting = useSelector(sortTypeSelector)
  const order = useSelector(orderSelector)

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

  const sortedTodos = sortTodosByProperty(sorting, todos, order)


  const form = isOpenForm ? (
          <Box mt={'20px'}>
            <CreateTodoForm onClose={closeForm}
              initialDate={initialDate}
              initialTag={initialTag}
              initialProject={initialProject}/>
          </Box>
      ) : !noAddButton && <AddTaskButton onCreate={openForm}/>

  return (
    <Box mt={'20px'} paddingBottom={'20px'}>
      <Box display={'flex'} alignItems={'center'} justifyContent={children ? 'space-between' : 'flex-end'} mb={'10px'}>
        {children}
        <Box display={'flex'} alignItems={'center'}>
          <SelectMenu todos={todos}
            setChosenTodos={setChosenTodos}
            chosenTodos={chosenTodos}
            allSelected={allSelected}
            toggleSelectAllTodos={toggleSelectAllTodos} />

          <SortingMenu/>
        </Box>

      </Box>
      <RenderedList todos={sortedTodos} onChooseTodo={toggleChosenTodo} chosenTodos={chosenTodos}/>
      {form}
    </Box>
  );
});


export default TodoList;
