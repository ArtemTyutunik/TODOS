import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {Box} from '@mui/material';
import {BaseFormInputs} from '../interfaces/interfaces';
import {IDate, ITodo, Priority, Label} from '../../interfaces';
import {useTodoDate} from '@entities/todos/hooks';
import useSelectPriority from '@shared/hooks/useSelectPriority';
import TodoFormInputs from '@shared/forms/ui/Inputs';
import FormActions from '@shared/forms/ui/setDataPanel';
import FormSubmissionButtons from '@shared/forms/ui/FormSubmissionButtons';
import BaseFormContext from '@shared/forms/hooks/UseBaseFormContext';
import {useDispatch} from 'react-redux';
import {addNewTodoTag} from '@entities/todos/store/todo';

const formStyles = {
  border: '1px solid #eee',
  padding: '10px 5px 8px 10px',
  borderRadius: '10px',
};

interface Props {
  onClose: () => void,
  onSubmit: (data: BaseFormInputs, date: IDate, priority: Priority | undefined, Label: Label) => void,
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
  const dispatch = useDispatch()
  const [todoDate, setTodoDate] = useTodoDate(initialDate || todo?.date, todo?.id);
  const [priority, setPriority] = useSelectPriority(todo?.priority);
  const [Label] = useState(todo ? todo.Label : '')
  const [Tags] = useState<string[]>(todo?.Tags || [])

  const onSelectTag = (newTag: string) => {
    const payload = {newTag, id: todo?.id}
    dispatch(addNewTodoTag(payload))
  }

  const formContextValues = {
    todoDate,
    setTodoDate,
    priority,
    setPriority,
    Tags,
    onSelectTag,
  }

  return <Box component='form'
    onSubmit={handleSubmit((data) => onSubmit(data, todoDate, priority, Label))}
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
