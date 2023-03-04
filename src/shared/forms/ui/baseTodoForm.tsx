import React from 'react';

import {Controller, useForm} from 'react-hook-form';
import {Box, Button, Divider, TextField} from '@mui/material';
import {IBaseFormInputsValues} from '../interfaces/interfaces';
import {IDate, ITodo, Priority} from '../../interfaces';
import {taskNameValidation} from '../validation/validation';
import DueDateButton from '@shared/components/DueDateComponents';
import {useTodoDate} from '@entities/todos/hooks';
import PriorityButton from '@shared/components/Priority/PriorityButton';
import useSelectPriority from '@shared/hooks/useSelectPriority';

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
  onSubmit: (data: IBaseFormInputsValues, date: IDate, priority: Priority | string | undefined) => void,
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
  const {control, handleSubmit, formState: {isValid}} = useForm<IBaseFormInputsValues>({defaultValues: {
    label: todo ? todo.label : '',
    description: todo ? todo.description : '',
  }});

  const [todoDate, setTodoDate] = useTodoDate(initialDate || todo?.date!, todo?.id);
  const [priority, setPriority] = useSelectPriority(todo?.priority)

  const onPassDateToBaseForm = (date: IDate) => {
    setTodoDate(date);
  };

  return <Box component='form' onSubmit={handleSubmit((data) => onSubmit(data, todoDate, priority))} color = {'#515761'}>
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
            <Box display={'flex'} alignItems={'center'}>
              <Box display={'flex'} mr={'15px'}>
                <DueDateButton date={todoDate} onPassDateToBaseForm={onPassDateToBaseForm}/>
              </Box>
              <Box display={'flex'}>
                <PriorityButton initialPriority={priority} changeHandler={setPriority} variant={'standard'}/>
              </Box>
              <Divider/>
            </Box>
        )
      }

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
