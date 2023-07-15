import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Delete} from '@mui/icons-material';
import DoneIcon from '@mui/icons-material/Done';
import {Box, Tooltip} from '@mui/material';
import CustomIconButton from '@shared/components/CustomIconButton';
import {completeSelectedTodo, deleteSelectedTodo} from '@shared/api/services/todos';
import {userIdSelector} from '@entities/user/model/store';
import {ITodo} from '@shared/interfacesAndTypes';
import {updateTodos} from '@entities/todos/store/todo';
import {useVisable} from '@shared/hooks';
import ConfirmDeleteModal from '@shared/components/ConfirmDeletion';
import {toast} from 'react-toastify';
import selectedTodosActionFailed from '@shared/components/Notification/errors/SelectedTodosActionFailed';
import {options} from '@shared/components/Notification/constants';

interface Props {
  selectedTodos: ITodo['id'][]
}
const SelectedTodosActions = ({selectedTodos}: Props) => {
  const userId = useSelector(userIdSelector)
  const [confirmDeletion, showConfirmDeletion, hideConfirmDeletion] = useVisable(false)
  const dispatch = useDispatch()

  const onDeleteSelected = async () => {
    try {
      const todos = await deleteSelectedTodo(userId, selectedTodos)
      dispatch(updateTodos(todos))
      hideConfirmDeletion()
    } catch (e) {
      toast(selectedTodosActionFailed('delete'), options)
      hideConfirmDeletion()
    }
  }

  const onCompleteSelected = async () => {
    try {
      const todos = await completeSelectedTodo(userId, selectedTodos)
      dispatch(updateTodos(todos))
    } catch (e) {
      toast(selectedTodosActionFailed('complete'), options)
    }
  }

  const selectedTodosActions = [
    {
      label: 'Delete',
      element: <Delete/>,
      onClick: () => showConfirmDeletion(),
    },
    {
      label: 'Complete',
      element: <DoneIcon sx={{color: '#808080', fontSize: '19px'}}/>,
      onClick: () => onCompleteSelected(),
    },
  ]

  return (
    <Box>
      {
        selectedTodosActions.map(({label, element, onClick}) => <CustomIconButton key={label}
          sx={{marginLeft: '10px'}}
          onClick={onClick}
        >
          <Tooltip title={label} sx={{color: '#808080', fontSize: '19px'}}>
            {element}
          </Tooltip>
        </CustomIconButton>)
      }
      <ConfirmDeleteModal isOpen={confirmDeletion} onClose={hideConfirmDeletion} onSubmit={onDeleteSelected}/>
    </Box>
  );
};

export default SelectedTodosActions;
