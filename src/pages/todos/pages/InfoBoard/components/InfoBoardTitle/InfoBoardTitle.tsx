import React, {useRef} from 'react';
import {TextareaAutosize} from '@mui/base';
import {styled} from '@mui/material/styles';

interface Props {
    initValue?: string,
    onTitleChange: (value: string) => void
}

const InfoBoardTitle = ({initValue = '', onTitleChange}: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const onBlur = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    if (value.length === 0) {
      textareaRef!.current!.value = initValue
    } else {
      onTitleChange(value);
    }
  }

  const onSubmit = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      (e.target as HTMLTextAreaElement).blur();
    }
  }

  return (
    <CustomTextArea
      onKeyDown={onSubmit}
      onBlur={onBlur}
      placeholder={'Short title'}
      defaultValue={initValue}
      ref={textareaRef}
      data-testid="title-input"/>
  );
};


const CustomTextArea = styled(TextareaAutosize)(() => ({
  '&:focus-visible': {
    border: 'none',
    backgroundColor: 'transparent !important',
  },
  '&: hover': {
    backgroundColor: `rgb(235, 236, 240)`,
  },
  '&::placeholder': {
    color: '#a2a2a2',
    fontSize: '18px',
  },
  'border': 'none',
  'fontSize': '19px',
  'width': '100%',
  'resize': 'none',
  'color': '#444343',
  'fontWeight': '600',
  'padding': '5px 10px',
  'borderRadius': '5px',
  'margin': '10px 0',
}))

export default InfoBoardTitle;
