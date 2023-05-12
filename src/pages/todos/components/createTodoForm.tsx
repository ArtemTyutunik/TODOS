import {useDispatch, useSelector} from 'react-redux';
import {toast, ToastOptions} from 'react-toastify';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {Box, Button, Typography, Link as MuiLink} from '@mui/material';

import BaseTodoForm from '@shared/forms/ui/baseTodoForm';
import {addNewTask} from '@entities/todos/store/todo';
import {ITodo} from '@shared/interfaces';
import {postNewTodo} from '@shared/api/services/todosService/fetchTodos';
import {userIdSelector} from '@pages/authorization/store';

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

function TodoCreatedNotification({onNavigate}: {onNavigate: () => void}) {
  return (
    <Box display={'flex'} alignItems={'center'}>
      <Typography marginRight={'10px'}>
                Task added to <MuiLink component={RouterLink} color={'primary.main'} sx={{textDecoration: 'none'}} to={'/Inbox'} >
                Inbox
        </MuiLink>
      </Typography>
      <Button sx={{textTransform: 'none', marginTop: '-2px'}} onClick={onNavigate}>
                Open
      </Button>
    </Box>
  )
}

const options: ToastOptions = {
  position: 'bottom-left',
  autoClose: 10000,
  hideProgressBar: true,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
  theme: 'light',
  toastId: 'customId',
}
