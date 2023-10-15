import {Controller} from 'react-hook-form';
import {TextField} from '@mui/material';
import {Control} from 'react-hook-form'
import {taskNameValidation} from '@shared/forms/validation/validation';
import {BaseFormInputs} from '@shared/forms/interfaces/interfaces';
import {styled} from '@mui/material/styles';

interface Props {
    control: Control<BaseFormInputs>
}
const TodoFormInputs = ({control}: Props) => {
  return (
    <>
      <Controller name={'label'}
        rules={taskNameValidation}
        control={control}
        render={({field}) => <InputTheme {...field}
          variant={'standard'}
          onChange={field.onChange}
          placeholder={'Task name'}
          autoFocus
          InputProps={{disableUnderline: true}}/>}
      />

      <Controller name={'description'}
        control={control}
        render={({field}) => <InputTheme {...field}
          variant={'standard'}
          onChange={field.onChange}
          placeholder={'Description'}
          InputProps={{disableUnderline: true}}/>}
      />
    </>
  );
};

const InputTheme = styled(TextField)(({theme}) => ({
  'width': '100%',
  '& .MuiInputBase-input': {
    color: theme.text.main,
  },
}));

export default TodoFormInputs;
