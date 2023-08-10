import React, {useEffect, useRef} from 'react';
import {Box} from '@mui/material';

interface Props {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TodoDescriptionInput = ({value, onChange}: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    adjustTextareaHeight();
  }, [value]);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <Box component={'textarea'}
      placeholder={'Description'}
      ref={textareaRef}
      sx={styles}
      onChange={onChange}
      value={value}>
    </Box>
  );
};

const styles = {
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
}

export default TodoDescriptionInput
