import React, {ForwardedRef, forwardRef} from 'react';
import {Box} from '@mui/material';

interface Props {
  onChange: (e: React.SyntheticEvent) => void
}

const LabelInput = forwardRef(({onChange}: Props, ref: ForwardedRef<HTMLFormElement>) => {
  return (
    <Box contentEditable onKeyDown={(e) => {
      console.log('here')
      if (e.key === 'Enter') {
        console.log('and here')
        e.preventDefault();
        // @ts-ignore
        ref?.current?.submit();
      }
      onChange(e);
    }}>

    </Box>
  );
});

export default LabelInput;
