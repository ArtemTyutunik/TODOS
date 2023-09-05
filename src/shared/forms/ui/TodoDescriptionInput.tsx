import React from 'react';
import {TextareaAutosize} from '@mui/material';
import {styled} from '@mui/material/styles';

interface Props {
    value: string;
    onBlur?: () => void
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TodoDescriptionInput = ({value, onChange}: Props) => {
  return (
    <CustomTextArea
      placeholder={'Description'}
      onChange={onChange}
      value={value}/>
  );
};

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
