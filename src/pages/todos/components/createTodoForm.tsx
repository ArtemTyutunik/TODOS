import {useDispatch} from 'react-redux';
// @ts-ignore
import {toast} from 'react-toastify';
import {Link, useNavigate} from 'react-router-dom';
import {Box, Button, Typography} from '@mui/material';

import BaseTodoForm from '../../../shared/forms/ui/baseTodoForm';
import {addNewTask} from '../../../entities/todos/store/todo';
import {IBaseFormInputsValues} from '../../../shared/forms/interfaces/interfaces';
import {IDate} from '../../../shared/interfaces';

interface Props {
    onClose: () => void
}

const TodoCreatedNotification = ({onNavigate}: {onNavigate: () => void}) => {
  return (
    <Box display={'flex'} alignItems={'center'}>
      <Typography>
        Task added to <Link to={'Inbox'}>Inbox</Link>
      </Typography>
      <Button sx={{textTransform: 'none'}} onClick={onNavigate}>
        Open
      </Button>
    </Box>
  )
}

const options = {
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


const CreateTodoForm = ({onClose}: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const notify = (id: number) => {
    // @ts-ignore
    toast(<TodoCreatedNotification onNavigate={() => navigate(`task/${id}`)}/>, options);
  }

  const onSubmit = (data:IBaseFormInputsValues, date: IDate) => {
    const id = Date.now()
    dispatch(addNewTask({...data, id, done: false, date: date}));
    notify(id)
    onClose();
  };

  return <>
    <BaseTodoForm onClose={onClose} onSubmit={onSubmit}/>
  </>
};


export default CreateTodoForm;
