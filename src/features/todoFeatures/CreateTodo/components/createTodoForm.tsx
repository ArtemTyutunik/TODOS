import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-toastify';

import BaseTodoForm from '@features/todoFeatures/components/baseTodoForm';
import {addNewTask} from '@entities/todos/store/todo';
import {ITodo} from '@shared/interfacesAndTypes';
import {postNewTodo} from '@shared/api/services/todos';
import {userIdSelector} from '@entities/user/model/store';
import TodoCreatedNotification from '@shared/components/Notification/TodoCreated';
import {options} from '@shared/components/Notification/constants';

interface Props {
    onClose: () => void
}

interface Props {
  onClose: () => void,
  initialDate?: string,
  initialProject?: string
}

const CreateTodoForm = ({onClose, initialDate, initialProject}: Props) => {
  const dispatch = useDispatch();
  const userId = useSelector(userIdSelector)

  const notify = () => {
    toast(<TodoCreatedNotification/>, options);
  }

  const onSubmit = (newTodo: ITodo ) => {
    try {
      postNewTodo(newTodo, userId)
      dispatch(addNewTask(newTodo));
      notify()
      onClose();
    } catch (e) {
      console.log(e)
    }
  };

  return <BaseTodoForm onClose={onClose} onSubmit={onSubmit} initialDate={initialDate} todoProjectId={initialProject}/>
};

export default CreateTodoForm;


