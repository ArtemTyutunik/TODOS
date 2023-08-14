import {useAppDispatch} from '@app/store';

import BaseTodoForm from '@features/todoFeatures/components/baseTodoForm';
import {ITodo} from '@shared/interfacesAndTypes';
import {addNewTaskThunk} from '@entities/todos/store/todoThunks';

interface Props {
    onClose: () => void
}

interface Props {
  onClose: () => void,
  initialDate?: string,
  initialProject?: string
}

const CreateTodoForm = ({onClose, initialDate, initialProject}: Props) => {
  const dispatch = useAppDispatch();

  const onSubmit = (newTodo: ITodo ) => {
    dispatch(addNewTaskThunk(newTodo));
    onClose();
  };

  return <BaseTodoForm onClose={onClose}
    onSubmit={onSubmit}
    initialDate={initialDate}
    todoProjectId={initialProject}/>
};

export default CreateTodoForm;


