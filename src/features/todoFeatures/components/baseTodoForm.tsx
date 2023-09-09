import React, {useRef, useState} from 'react';
import {Box, SelectChangeEvent} from '@mui/material';
import {ITodo, Priority} from '@shared/interfacesAndTypes';
import {useTags} from '@entities/tag/utils/useTags';
import {useTodoDate} from '@entities/todos/hooks';
import FormActions from '@features/todoFeatures/components/setDataPanel';
import FormSubmissionButtons from '@shared/forms/ui/FormSubmissionButtons';
import BaseFormContext from '@shared/forms/hooks/UseBaseFormContext';
import useBaseFormReducer, {
  changeDescriptionActionCreator,
  changeLabelActionCreator,
  changeProjectActionCreator,
} from '@shared/forms/hooks/useBaseFormReducer';
import ProjectSelect from '@shared/components/ProjectSelect';
import TodoDescriptionInput from '@shared/forms/ui/TodoDescriptionInput';
import TodoLabelInput from '@shared/forms/ui/todoLabelInput';

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
  const [formState, formDispatch] = useBaseFormReducer(todo, todoProjectId)
  const [todoDate, setTodoDate] = useTodoDate(initialDate || formState?.date, formState?.id);
  const [todoTags, onSelectTag] = useTags(formState, !!todo);
  const [isDisabledAfterSubmit, setIsDisabledAfterSubmit] = useState(false)
  const descriptionTextArea = useRef<HTMLTextAreaElement>(null)

  const setProject = (projectId: string) => {
    formDispatch(changeProjectActionCreator(projectId))
  }

  const setPriority = (event: SelectChangeEvent<Priority>) => {
    formDispatch({type: 'CHANGE_PRIORITY', payload: event.target.value})
  }

  const onLabelChange = (value: string) => {
    formDispatch(changeLabelActionCreator(value))
  }

  const onChangeDescription = () => {
    formDispatch(changeDescriptionActionCreator(descriptionTextArea.current?.value || ''))
  }

  const formContextValues = {
    todoDate,
    setTodoDate,
    priority: formState.priority,
    setPriority,
    todoTags,
    onSelectTag,
  }

  const isLabelInputValid = formState.label.trim().length > 0

  const onFormSubmit = () => {
    if (isLabelInputValid) {
      setIsDisabledAfterSubmit(true)
      const newTodo = {...formState, date: todoDate, tags: todoTags}
      onSubmit(newTodo)
    }
  }


  return <Box
    data-testid={'base-todo-form'}
    onSubmit={onFormSubmit}
    sx={(theme) => ({color: theme.description})}
  >
    <Box sx={formStyles}>
      <TodoLabelInput initValue={formState.label}
        onTitleChange={onLabelChange}
        onSubmit={onFormSubmit}/>
      <TodoDescriptionInput value={formState.description}
        onBlur={onChangeDescription}
        ref={descriptionTextArea}/>

      <BaseFormContext values={formContextValues}>
        <FormActions hideActions={hideActions}/>
      </BaseFormContext>

      <Box mt={'3px'} display={'flex'} alignItems={'center'} justifyContent={'space-between'} paddingRight={'10px'}>
        <ProjectSelect initialProjectId={todoProjectId} onChange={setProject}/>
        <FormSubmissionButtons isValid={!isDisabledAfterSubmit && isLabelInputValid}
          onSubmit={onFormSubmit}
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
