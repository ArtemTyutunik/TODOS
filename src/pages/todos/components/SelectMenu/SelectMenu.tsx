import React from 'react';
import {Box, Checkbox, Tooltip} from '@mui/material';
import SelectedTodosActions from '@pages/todos/components/SelectMenu/SelectedTodosActions';
import CustomIconButton from '@shared/components/CustomIconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SelectTodosMenu from '@pages/todos/components/SelectMenu/SelectTodosMenu';
import {useAnchorElement} from '@shared/hooks';
import {ITodo} from '@shared/interfacesAndTypes';

interface Props {
  todos: ITodo[],
  chosenTodos: ITodo['id'][],
  allSelected: boolean,
  toggleSelectAllTodos: (allSelected: boolean) => void
  setChosenTodos: (id: ITodo['id'][]) => void
}
const SelectMenu = ({chosenTodos,
  allSelected,
  toggleSelectAllTodos,
  todos,
  setChosenTodos}: Props) => {
  const [anchorEl, setAnchorAll, removeAnchorEl] = useAnchorElement(null)

  return (
    <Box display={'flex'} alignItems={'center'} justifyContent={'flex-end'} mr={'10px'}>
      {
        chosenTodos.length > 0 && <>
          <SelectedTodosActions selectedTodos={chosenTodos} setSelectedTodos={setChosenTodos}/>
        </>
      }

      <Box display={'flex'} alignItems={'center'} ml={'15px'}>
        <Tooltip title={'Choose all'}>
          <CustomIconButton>
            <Checkbox sx={{color: '#808080', padding: '0'}}
              size={'small'}
              checked={chosenTodos.length === todos.length && chosenTodos.length > 0}
              indeterminate={chosenTodos.length < todos.length && chosenTodos.length > 0}
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

  );
};

export default SelectMenu;
