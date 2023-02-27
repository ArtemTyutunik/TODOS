import React, {useState} from 'react';

import {Controller, useForm} from 'react-hook-form';
import {Box, Button, Divider, TextField} from '@mui/material';
import {IBaseFormInputsValues} from '../interfaces/interfaces';
import {IDate, ITodo} from '../../interfaces';
import {taskNameValidation} from '../validation/validation';
import DueDateButton from '../../../pages/todos/components/DueDateComponents/DueDateButton';

const formStyles = {
  border: '1px solid #eee',
  padding: '10px 5px 8px 10px',
  borderRadius: '10px',
};

const CancelButtonStyles = {
  marginRight: '15px',
  textTransform: 'initial',
  backgroundColor: '#f5f5f5',
  color: '#444',
  fontSize: '13px',
  boxShadow: 'none',
  padding: '1px 10px',
};

interface Props {
  onClose: () => void,
  onSubmit: (data: IBaseFormInputsValues, date: string | null) => void,
  todo?: ITodo,
  initialDate?: string,
  hideActions?: boolean
}
// if todo is not undefined it means that the field values will be the corresponding todo properties

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

  const [todoDate, setTodoDate] = useState<IDate>(initialDate || todo?.date!);

  const onPassDateToBaseForm = (date: IDate) => {
    setTodoDate(date);
  };

  return <Box component='form' onSubmit={handleSubmit((data) => onSubmit(data, todoDate))} color = {'#515761'}>
    <Box sx={formStyles}>
      <Controller name={'label'}
        rules={taskNameValidation}
        control={control}
        render={({field}) => <TextField {...field}
          variant={'standard'}
          onChange={field.onChange}
          placeholder={'Task name'}
          fullWidth
          autoFocus
          InputProps={{disableUnderline: true}}/>}
      />

      <Controller name={'description'}
        control={control}
        render={({field}) => <TextField {...field}
          variant={'standard'}
          onChange={field.onChange}
          placeholder={'Description'}
          fullWidth
          InputProps={{disableUnderline: true}}/>}
      />
      {
        hideActions ? null : (
            <>
              <Box display={'flex'} mb={'5px'}>
                <DueDateButton date={todoDate} onPassDateToBaseForm={onPassDateToBaseForm}/>
              </Box>
              <Divider/>
            </>
        )
      }

      <Box display={'flex'} marginTop={'5px'} justifyContent={'flex-end'}>
        <Button variant="contained" color={'inherit'}
          sx={CancelButtonStyles}
          onClick={onClose}>
                    Cancel
        </Button>
        <Button variant="contained" type={'submit'} disabled={!isValid} sx={{textTransform: 'initial'}}>
                    Submit
        </Button>
      </Box>
    </Box>

  </Box>;
};

export default BaseTodoForm;
