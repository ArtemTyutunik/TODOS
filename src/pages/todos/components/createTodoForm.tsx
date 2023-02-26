import {useDispatch} from 'react-redux';
// @ts-ignore
import {toast} from 'react-toastify';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {Box, Button, Typography, Link as MuiLink} from '@mui/material';

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
      <Typography marginRight={'10px'}>
        Task added to <MuiLink component={RouterLink} color={'#1976d2'} sx={{textDecoration: 'none'}} to={'/Inbox'} >
            Inbox
        </MuiLink>
      </Typography>
      <Button sx={{textTransform: 'none', marginTop: '-2px'}} onClick={onNavigate}>
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
