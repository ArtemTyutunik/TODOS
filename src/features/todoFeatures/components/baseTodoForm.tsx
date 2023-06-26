import {useForm} from 'react-hook-form';
import {Box, MenuItem, Select, SelectChangeEvent, Typography} from '@mui/material';
import {BaseFormInputs} from '@shared/forms/interfaces/interfaces';
import {ITodo, Priority} from '@shared/interfacesAndTypes';
import {useTags} from '@entities/tag/utils/useTags';
import {useTodoDate} from '@entities/todos/hooks';
import TodoFormInputs from '@shared/forms/ui/Inputs';
import FormActions from '@features/todoFeatures/components/setDataPanel';
import FormSubmissionButtons from '@shared/forms/ui/FormSubmissionButtons';
import BaseFormContext from '@shared/forms/hooks/UseBaseFormContext';
import useBaseFormReducer, {changeProjectActionCreator} from '@shared/forms/hooks/useBaseFormReducer';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import {projectsSelector} from '@entities/projects/model/store';
import {CircleIcon, InboxIcon} from '@shared/components/icons';

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

  return <Box component='form'
    onSubmit={handleSubmit((data) => {
      setIsDisabledAfterSubmit(true)
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

interface ProjectSelectProps {
  initialProjectId?: string,
  onChange: (id: string) => void
}

const ProjectSelect = ({initialProjectId, onChange}: ProjectSelectProps) => {
  const inboxID = localStorage.getItem('inboxID')
  if (!inboxID) return null
  const [currentProject, setCurrentProject] = useState(initialProjectId || inboxID)
  const projects = useSelector(projectsSelector)

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string
    setCurrentProject(value);
    onChange(value)
  };

  return <Select value={currentProject}
    onChange={handleChange}
    className={'project-select'}
    sx={selectStyles}
  >
    <MenuItem value={inboxID} sx={selectItemStyles}>
      <InboxIcon sx={(theme) => ({color: theme.background.inboxIcon, fontSize: '17px'})}/>
      <Typography ml={'10px'} fontSize={'13px'} color={'#202020'}>
        Inbox
      </Typography>
    </MenuItem>
    {
      projects.map((project) => <MenuItem key={project.id} value={project.id}>
        <CircleIcon sx={{fontSize: '12px', color: project.color.background}}/>
        <Typography ml={'10px'} fontSize={'13px'} color={'#202020'}>
          {project.name}
        </Typography>
      </MenuItem>)
    }
  </Select>
}

const selectStyles = {
  '& .MuiSelect-select': {
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    border: 'none',
  },
  '& fieldset': {
    border: 'none',
  },
}

const selectItemStyles = {
  display: 'flex',
  padding: '0px 15px',
  alignItems: 'center',
}


export default BaseTodoForm;
