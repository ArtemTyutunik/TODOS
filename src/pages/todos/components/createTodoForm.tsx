import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';

import BaseTodoForm from '@shared/forms/ui/baseTodoForm';
import {addNewTask} from '@entities/todos/store/todo';
import {ITodo} from '@shared/interfaces';
import {postNewTodo} from '@shared/api/services/todosService/fetchTodos';
import {userIdSelector} from '@pages/authorization/store';
import TodoCreatedNotification from '@shared/components/Notification/TodoCreated';
import {options} from '@shared/components/Notification/constants';

interface Props {
    onClose: () => void
}

interface Props {
  onClose: () => void,
  initialDate?: string
}

const CreateTodoForm = ({onClose, initialDate}: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const userId = useSelector(userIdSelector)

  const notify = (id: number) => {
    toast(<TodoCreatedNotification onNavigate={() => navigate(`task/${id}`)}/>, options);
  }

  const onSubmit = (newTodo: ITodo ) => {
    console.log(newTodo)
    postNewTodo(newTodo, userId)
        .then(() => {
          dispatch(addNewTask(newTodo));
          notify(newTodo.id)
          onClose();
        })
  };

  return <BaseTodoForm onClose={onClose} onSubmit={onSubmit} initialDate={initialDate}/>
};

export default CreateTodoForm;


