import {Controller} from 'react-hook-form';
import {TextField} from '@mui/material';
import {Control} from 'react-hook-form'
import {BaseFormInputs} from '@shared/forms/interfaces/interfaces';
import {taskNameValidation} from '@shared/forms/validation/validation';

interface Props {
    control: Control<BaseFormInputs>
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
    </>
  );
};

export default TodoFormInputs;
