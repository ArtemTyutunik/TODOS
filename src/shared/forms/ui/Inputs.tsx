import {Controller} from 'react-hook-form';
import {TextField} from '@mui/material';
import {Control} from 'react-hook-form'
import {taskNameValidation} from '@shared/forms/validation/validation';
import {IBaseFormInputsValues} from '@shared/forms/interfaces/interfaces';

interface Props {
    control: Control<IBaseFormInputsValues>
}
const TodoFormInputs = ({control}: Props) => {
  return (
    <>
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
    </>
  );
};

export default TodoFormInputs;
