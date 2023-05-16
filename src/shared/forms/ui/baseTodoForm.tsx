import {useForm} from 'react-hook-form';
import {Box, SelectChangeEvent} from '@mui/material';
import {BaseFormInputs} from '../interfaces/interfaces';
import {ITodo, Priority} from '../../interfaces';
import {useTags} from '@shared/components/Tags/useTags';
import {useTodoDate} from '@entities/todos/hooks';
import TodoFormInputs from '@shared/forms/ui/Inputs';
import FormActions from '@shared/forms/ui/setDataPanel';
import FormSubmissionButtons from '@shared/forms/ui/FormSubmissionButtons';
import BaseFormContext from '@shared/forms/hooks/UseBaseFormContext';
import useBaseFormReducer from '@shared/forms/hooks/useBaseFormReducer';

const formStyles = {
  border: '1px solid #eee',
  padding: '10px 5px 8px 10px',
  borderRadius: '10px',
};

interface Props {
  onClose: () => void,
  onSubmit: (newTodo: ITodo) => void,
  todo?: ITodo,
  initialDate?: string,
  hideActions?: boolean
}

const BaseTodoForm = ({
  onClose,
  onSubmit,
  todo,
  initialDate,
  hideActions}: Props) => {
  const defaultInputValues = {
    label: todo?.label || '',
    description: todo?.description || '',
  }

  const {control, handleSubmit, formState: {isValid}} = useForm<BaseFormInputs>({defaultValues: defaultInputValues});
  const [formState, formDispatch] = useBaseFormReducer(todo)
  const [todoDate, setTodoDate] = useTodoDate(initialDate || formState?.date, formState?.id);
  const [todoTags, onSelectTag] = useTags(formState, !!todo);

  const setPriority = (event: SelectChangeEvent<Priority>) => {
    formDispatch({type: 'CHANGE_PRIORITY', payload: event.target.value})
  }

  const formContextValues = {
    todoDate,
    setTodoDate,
    priority: formState.priority,
    setPriority,
    todoTags,
    onSelectTag,
  }

  return <Box component='form'
    onSubmit={handleSubmit((data) => {
      const newTodo = {...formState, ...data, date: todoDate, tags: todoTags}
      onSubmit(newTodo)
    })}
    sx={(theme) => ({color: theme.description})}
  >
    <Box sx={formStyles}>
      <TodoFormInputs control={control}/>

      <BaseFormContext values={formContextValues}>
        <FormActions hideActions={hideActions}/>
      </BaseFormContext>

      <FormSubmissionButtons isValid={isValid} onClose={onClose}/>
    </Box>

  </Box>;
};

export default BaseTodoForm;
