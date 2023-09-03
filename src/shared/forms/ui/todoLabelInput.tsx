import React, {useEffect, useRef} from 'react';
import {TextareaAutosize} from '@mui/material';
import {styled} from '@mui/material/styles';

interface Props {
    initValue: string,
    onTitleChange: (value: string) => void
    onSubmit: () => void
}

const TodoLabelInput = ({initValue, onTitleChange, onSubmit}: Props) => {
  const textAreaElementRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textAreaElementRef.current) {
      textAreaElementRef.current.focus()
      textAreaElementRef.current.selectionStart = initValue.length
    }
  }, [])

  const onEnterKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      if ((e.target as HTMLTextAreaElement).value.trim().length > 0) {
        onSubmit()
      } else {
        e.preventDefault()
      }
    }
  }

  return (
    <CustomTextArea
      onKeyDown={onEnterKeyDown}
      placeholder={'Task label'}
      defaultValue={initValue}
      ref={textAreaElementRef}
      onChange={(e) => onTitleChange(e.target.value as string)}/>
  );
};

const CustomTextArea = styled(TextareaAutosize)(() => ({
  '&:focus-visible': {
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent !important',
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
  'fontWeight': '400',
  'padding': '5px 0px 10px',
  'borderRadius': '5px',
}))


export default TodoLabelInput;
