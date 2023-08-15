import React from 'react';
import {Box, Checkbox, Tooltip, useTheme} from '@mui/material';
import SelectedTodosActions from '@pages/todos/components/SelectMenu/SelectedTodosActions';
import CustomIconButton from '@shared/components/CustomIconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SelectTodosMenu from '@pages/todos/components/SelectMenu/SelectTodosMenu';
import {useAnchorElement} from '@shared/hooks';
import {ITodo} from '@shared/interfacesAndTypes';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {styled} from '@mui/material/styles';

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
  const theme = useTheme()

  return (
    <Box display={'flex'} alignItems={'center'} justifyContent={'flex-end'} mr={'10px'}>
      {
        chosenTodos.length > 0 && <>
          <SelectedTodosActions selectedTodos={chosenTodos} setSelectedTodos={setChosenTodos}/>
        </>
      }

      <MenuBox display={'flex'} alignItems={'center'} ml={'15px'}>
        <Tooltip title={'Choose all'}>
          <CustomIconButton>
            <Checkbox sx={{color: theme.background.icons, padding: '0'}}
              size={'small'}
              className={'select-todo-checkbox'}
              checked={chosenTodos.length === todos.length && chosenTodos.length > 0}
              indeterminate={chosenTodos.length < todos.length && chosenTodos.length > 0}
              disableRipple
              checkedIcon={<CheckBoxIcon sx={{color: theme.background.icons, padding: '0'}}/>}
              onChange={() => toggleSelectAllTodos(!allSelected)}/>
          </CustomIconButton>
        </Tooltip>

        <ChevronRightIcon sx={{transform: 'rotate(90deg)',
          color: theme.background.icons,
          fontSize: '20px',
          cursor: 'pointer'}}
        onClick={(e: React.SyntheticEvent) => setAnchorAll(e.target as HTMLElement)}
        />

        <SelectTodosMenu anchorEl={anchorEl}
          removeAnchorEl={removeAnchorEl}
          todos={todos}
          setChosenTodos={setChosenTodos}
        />
      </MenuBox>
    </Box>

  );
};

const MenuBox = styled(Box)(({theme}) => ({
  '& .select-todo-checkbox': {
    color: theme.background.icons,
  },
}))


export default SelectMenu;
