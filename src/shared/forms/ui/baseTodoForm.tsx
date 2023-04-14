import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {Box, Button, SelectChangeEvent, Theme} from '@mui/material';
import {IBaseFormInputsValues} from '../interfaces/interfaces';
import {IDate, ITodo, Priority, Label} from '../../interfaces';
import {useTodoDate} from '@entities/todos/hooks';
import useSelectPriority from '@shared/hooks/useSelectPriority';
import TodoFormInputs from '@shared/forms/ui/Inputs';
import FormActions from '@shared/forms/ui/setDataPanel';

const formStyles = {
  border: '1px solid #eee',
  padding: '10px 5px 8px 10px',
  borderRadius: '10px',
};

const CancelButtonStyles = (theme: Theme) => ({
  marginRight: '15px',
  textTransform: 'initial',
  backgroundColor: theme.background.lightGrey,
  color: '#444',
  fontSize: '13px',
  boxShadow: 'none',
  padding: '1px 10px',
});

interface IFormContext {
  todoDate: IDate,
  setTodoDate: (newDate: IDate) => void,
  priority: Priority | undefined,
  setPriority: (event: SelectChangeEvent<Priority>) => void,
  Label: string | undefined,
  setLabel: React.Dispatch<React.SetStateAction<string | undefined>>
}

interface Props {
  onClose: () => void,
  onSubmit: (data: IBaseFormInputsValues, date: IDate, priority: Priority | undefined, Label: Label) => void,
  todo?: ITodo,
  initialDate?: string,
  hideActions?: boolean
}

export const FormContext = React.createContext<IFormContext>(null!)

const BaseTodoForm = ({
  onClose,
  onSubmit,
  todo,
  initialDate,
  hideActions}: Props) => {
  const {control, handleSubmit, formState: {isValid}} = useForm<IBaseFormInputsValues>({defaultValues: {
    label: todo ? todo.label : '',
    description: todo ? todo.description : '',
  }});

  const [todoDate, setTodoDate] = useTodoDate(initialDate || todo?.date!, todo?.id);
  const [priority, setPriority] = useSelectPriority(todo?.priority);
  const [Label, setLabel] = useState(todo ? todo.Label : '')

  const formContextValues = {
    todoDate,
    setTodoDate,
    priority,
    setPriority,
    Label,
    setLabel,
  }

  return <Box component='form'
    onSubmit={handleSubmit((data) => onSubmit(data, todoDate, priority, Label))}
    sx={(theme) => ({color: theme.description})}>
    <Box sx={formStyles}>
      <TodoFormInputs control={control}/>

      <FormContext.Provider value={formContextValues}>
        <FormActions hideActions={hideActions}/>
      </FormContext.Provider>

      <Box display={'flex'} marginTop={'5px'} justifyContent={'flex-end'}>
        <Button variant="contained" color={'inherit'}
          sx={CancelButtonStyles}
          onClick={onClose}>
                    Cancel
        </Button>
        <Button variant="contained"
          type={'submit'}
          disabled={!isValid}
          sx={{textTransform: 'initial'}}>
                    Submit
        </Button>
      </Box>
    </Box>

  </Box>;
};

export default BaseTodoForm;
