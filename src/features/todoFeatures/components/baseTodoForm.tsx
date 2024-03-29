import {useForm} from 'react-hook-form';
import {Box, SelectChangeEvent} from '@mui/material';
import {BaseFormInputs} from '@shared/forms/interfaces/interfaces';
import {IDate, ITodo, Priority} from '@shared/interfacesAndTypes';
import {useTags} from '@entities/tag/utils/useTags';
import TodoFormInputs from '@shared/forms/ui/Inputs';
import FormActions from '@features/todoFeatures/components/setDataPanel';
import FormSubmissionButtons from '@shared/forms/ui/FormSubmissionButtons';
import BaseFormContext from '@shared/forms/hooks/UseBaseFormContext';
import useBaseFormReducer, {
  changeDateActionCreator,
  changeProjectActionCreator,
} from '@shared/forms/hooks/useBaseFormReducer';
import {useState} from 'react';
import ProjectSelect from '@shared/components/ProjectSelect';

interface Props {
  onClose: () => void,
  onSubmit: (newTodo: ITodo) => void,
  todo?: ITodo,
  initialDate?: string,
  hideActions?: boolean,
  todoProjectId?: string
}

const BaseTodoForm = ({
  onClose,
  onSubmit,
  todo,
  initialDate,
  hideActions,
  todoProjectId}: Props) => {
  const defaultInputValues = {
    label: todo?.label || '',
    description: todo?.description || '',
  }

  const {control, handleSubmit, formState: {isValid}} = useForm<BaseFormInputs>({defaultValues: defaultInputValues});
  const [formState, formDispatch] = useBaseFormReducer(todo, {todoProjectId, initialDate})
  const [todoTags, onSelectTag] = useTags(formState, !!todo);
  const [isDisabledAfterSubmit, setIsDisabledAfterSubmit] = useState(false)


  const setProject = (projectId: string) => {
    formDispatch(changeProjectActionCreator(projectId))
  }

  const setPriority = (event: SelectChangeEvent<Priority>) => {
    formDispatch({type: 'CHANGE_PRIORITY', payload: event.target.value})
  }

  const setTodoDate = (date: IDate) => {
    formDispatch(changeDateActionCreator(date))
  }

  const formContextValues = {
    todoDate: formState?.date,
    setTodoDate,
    priority: formState.priority,
    setPriority,
    todoTags,
    onSelectTag,
  }

  return <Box component='form'
    onSubmit={handleSubmit((data) => {
      setIsDisabledAfterSubmit(true)
      const newTodo = {...formState, ...data, tags: todoTags}
      onSubmit(newTodo)
    })}
    sx={(theme) => ({color: theme.description})}
  >
    <Box sx={formStyles}>
      <TodoFormInputs control={control}/>

      <BaseFormContext values={formContextValues}>
        <FormActions hideActions={hideActions}/>
      </BaseFormContext>

      <Box mt={'3px'} display={'flex'} alignItems={'center'} justifyContent={'space-between'} paddingRight={'10px'}>
        <ProjectSelect initialProjectId={todoProjectId} onChange={setProject}/>
        <FormSubmissionButtons isValid={!isDisabledAfterSubmit && isValid}
          onClose={onClose}
          withLoading={isDisabledAfterSubmit}
        />
      </Box>

    </Box>

  </Box>;
};

const formStyles = {
  border: '1px solid #eee',
  padding: '10px 5px 8px 10px',
  borderRadius: '10px',
};


export default BaseTodoForm;
