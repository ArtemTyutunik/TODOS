import React from 'react';
import {MenuItem} from '@mui/material';
import DropdownMenu from '@shared/components/dropdownMenu';
import {Anchor, ITodo} from '@shared/interfacesAndTypes';
import {overdueDate} from '@shared/constants';

interface Props {
    anchorEl: Anchor,
    removeAnchorEl: () => void,
  todos: ITodo[],
  setChosenTodos: (chosenTodos: ITodo['id'][]) => void
}


const SelectTodosMenu = ({anchorEl, removeAnchorEl, todos, setChosenTodos}: Props) => {
  const filterByCondition = (conditionFn: (todo: ITodo) => boolean) => {
    const filteredTodos = todos.reduce((accumulator: ITodo['id'][], currentValue) => {
      if (conditionFn(currentValue)) {
        return [...accumulator, currentValue.id]
      }

      return accumulator;
    }, [])

    setChosenTodos(filteredTodos)
  }


  const menuItems = [
    {
      text: 'Complete',
      onClick: () => filterByCondition((todo) => todo.done),
    },
    {
      text: 'Overdue',
      onClick: () => filterByCondition((todo) => overdueDate(todo.date!)),
    },
    {
      text: 'Marked as current',
      onClick: () => filterByCondition((todo) => !!todo.isCurrent),
    },
    {
      text: 'Uncompleted',
      onClick: () => filterByCondition((todo) => !todo.done),
    },
    {
      text: 'No one',
      onClick: () => setChosenTodos([]),
    },
  ]

  return (
    <DropdownMenu anchorEl={anchorEl} handleClose={removeAnchorEl}>
      {
        menuItems.map((item) => <MenuItem key={item.text} onClick={item.onClick}
          sx={{padding: '5px 35px', fontSize: '16px', color: '#202020'}}
        >
          {item.text}
        </MenuItem>)
      }
    </DropdownMenu>
  );
};


export default SelectTodosMenu;
