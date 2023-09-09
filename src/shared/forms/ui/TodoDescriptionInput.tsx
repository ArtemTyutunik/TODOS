import React, {ForwardedRef, forwardRef} from 'react';
import {TextareaAutosize} from '@mui/material';
import {styled} from '@mui/material/styles';

interface Props {
    value: string;
    onBlur?: () => void,
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const TodoDescriptionInput = forwardRef(({value, onBlur, onChange}: Props,
    ref: ForwardedRef<HTMLTextAreaElement>) => {
  return (
    <CustomTextArea
      placeholder={'Description'}
      defaultValue={value}
      data-testid={'description-input'}
      ref={ref}
      onChange={onChange}
      onBlur={onBlur}/>
  );
});

const CustomTextArea = styled(TextareaAutosize)(() => ({
  '&:focus-visible': {
    border: 'none',
    outline: 'none',
  },
  '&::placeholder': {
    color: '#a2a2a2',
    fontSize: '16px',
  },
  'border': 'none',
  'fontSize': '16px',
  'width': '100%',
  'resize': 'none',
  'color': '#444343',
  'fontWeight': '300',
  'minHeight': 'fit-content',
}));

export default TodoDescriptionInput
