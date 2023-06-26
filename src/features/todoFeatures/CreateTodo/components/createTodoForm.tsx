import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';

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
  const navigate = useNavigate()
  const userId = useSelector(userIdSelector)

  const notify = (id: number) => {
    toast(<TodoCreatedNotification onNavigate={() => navigate(`task/${id}`)}/>, options);
  }

  const onSubmit = (newTodo: ITodo ) => {
    try {
      postNewTodo(newTodo, userId)
      dispatch(addNewTask(newTodo));
      notify(newTodo.id)
      onClose();
    } catch (e) {
      console.log(e)
    }
  };

  return <BaseTodoForm onClose={onClose} onSubmit={onSubmit} initialDate={initialDate} todoProjectId={initialProject}/>
};

export default CreateTodoForm;


