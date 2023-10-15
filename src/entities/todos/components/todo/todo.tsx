import React, {memo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {addNewTask, deleteTask, setPriority, toggleIsCurrent, toggleTaskComplete} from '../../store/todo';
import {EditTodoForm} from '@features/todoFeatures/EditTodo';
import {ITodo, Priority} from '@shared/interfacesAndTypes';
import TodoCard from '../todoCard';
import {useLocalStorage, useVisable} from '@shared/hooks';
import {deleteTodoById, postNewTodo, sendUpdatedTodo} from '@shared/api/services/todos';
import {userIdSelector} from '@entities/user/model/store';
import {Box} from '@mui/material';
import ModalWindow from '@entities/todos/components/onCompleteChangeCurrentStatusModal';

interface Props {
    todo: ITodo
}

const Todo = memo(({todo}: Props) => {
  const {id, projectId, isCurrent} = todo;
  const dispatch = useDispatch();
  const userId = useSelector(userIdSelector)
  const [isEditing, openEditing, closeEditing] = useVisable(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [askToDeleteCurrentStatus] = useLocalStorage('askToDeleteCurrentStatus', true)
  const [removeIsCurrentStatus] = useLocalStorage('removeIsCurrentStatus', true)

  const confirmComplete = (isCurrent?:boolean) => {
    try {
      sendUpdatedTodo({id, projectId, done: !todo.done, isCurrent: isCurrent}, userId)
      dispatch(toggleTaskComplete(Number(id)));
      dispatch(toggleIsCurrent(todo));
    } catch (e) {
      console.log(e)
    }
  }

  const onComplete = () => {
    if (!todo.done) {
      if (askToDeleteCurrentStatus === true && todo.isCurrent) {
        setIsModalOpen(true)
      } else if (isCurrent) {
        confirmComplete(!removeIsCurrentStatus)
      } else confirmComplete(isCurrent)
    } else confirmComplete(isCurrent)
  };

  const onDeleteAction = () => {
    try {
      deleteTodoById(id, userId)
      dispatch(deleteTask(id));
    } catch (e) {
      console.log(e)
    }
  };
  const onDuplicateAction = () => {
    const newTodo = ({...todo, id: Date.now()})
    dispatch(addNewTask(newTodo));
    try {
      postNewTodo(newTodo, userId)
    } catch (e) {
      console.log(e)
    }
  };
  const setPriorityAction = (priority: Priority) => {
    try {
      const data = {id, priority}
      sendUpdatedTodo(data, userId)
      dispatch(setPriority(data));
    } catch (e) {
      console.log(e)
    }
  };

  if (isEditing) {
    return <Box width={'100%'}>
      <EditTodoForm onClose={closeEditing} todo={todo}/>
    </Box>
  }

  return (
    <>
      <TodoCard
        todo={todo}
        onDeleteAction={onDeleteAction}
        onDuplicateAction={onDuplicateAction}
        setPriorityAction={setPriorityAction}
        onComplete={onComplete}
        onEdit={openEditing}/>
      <ModalWindow opened={isModalOpen} close={() => setIsModalOpen(false)} confirmComplete={confirmComplete}/>
    </>
  );
});

export default Todo;
