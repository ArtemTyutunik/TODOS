import React, {useRef} from 'react';
import {Box} from '@mui/material';

interface Props {
    value: string,
    onTitleChange: (e: React.SyntheticEvent) => void
}
const InfoBoardTitle = ({value, onTitleChange}: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const onBlur = (e: React.SyntheticEvent) => {
    onTitleChange(e);
  }

  const onSubmit = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      (e.target as HTMLTextAreaElement).blur();
    }
  }

  return (
    <Box component={'textarea'}
      sx={styles}
      onKeyDown={onSubmit}
      onBlur={onBlur}
      placeholder={'Short title'}
      defaultValue={value}
      ref={textareaRef}>
    </Box>
  );
};


const styles = {
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
  'height': 'fit-content !important',
  'padding': '5px 10px',
  'borderRadius': '5px',
  'margin': '10px',
}

export default InfoBoardTitle;
