import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {Box, SelectChangeEvent} from '@mui/material';
import {BaseFormInputs} from '@shared/forms/interfaces/interfaces';
import {ITodo, Priority} from '@shared/interfacesAndTypes';
import {useTags} from '@entities/tag/utils/useTags';
import {useTodoDate} from '@entities/todos/hooks';
import TodoFormInputs from '@shared/forms/ui/Inputs';
import FormActions from '@features/todoFeatures/components/setDataPanel';
import FormSubmissionButtons from '@shared/forms/ui/FormSubmissionButtons';
import BaseFormContext from '@shared/forms/hooks/UseBaseFormContext';
import useBaseFormReducer, {changeProjectActionCreator} from '@shared/forms/hooks/useBaseFormReducer';
import ProjectSelect from '@shared/components/ProjectSelect';
import TodoDescriptionInput from '@shared/forms/ui/TodoDescriptionInput';

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
  const [formState, formDispatch] = useBaseFormReducer(todo, todoProjectId)
  const [todoDate, setTodoDate] = useTodoDate(initialDate || formState?.date, formState?.id);
  const [todoTags, onSelectTag] = useTags(formState, !!todo);
  const [isDisabledAfterSubmit, setIsDisabledAfterSubmit] = useState(false)
  const [description, setDescription] = useState(todo?.description || '')

  const setProject = (projectId: string) => {
    formDispatch(changeProjectActionCreator(projectId))
  }

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

  const onFormSubmit = (data: {label: string}) => {
    setIsDisabledAfterSubmit(true)
    const inputsData = {...data, description: description}
    const newTodo = {...formState, ...inputsData, date: todoDate, tags: todoTags}
    onSubmit(newTodo)
  }

  const onChangeDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value)
  }

  return <Box component='form'
    onSubmit={handleSubmit((onFormSubmit))}
    sx={(theme) => ({color: theme.description})}
  >
    <Box sx={formStyles}>
      <TodoFormInputs control={control}/>
      <TodoDescriptionInput value={description} onChange={onChangeDescription}/>

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
