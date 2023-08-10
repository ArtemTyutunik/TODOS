import React, {ForwardedRef, forwardRef, useState} from 'react';
import {Box} from '@mui/material';

interface Props {
  value: string
}

const LabelInput = forwardRef(({value}: Props, ref: ForwardedRef<HTMLDivElement>) => {
  const [showPlaceholder, setShowPlaceholder] = useState(value);

  const onChange = (e: React.SyntheticEvent) => {
    const outerText = (e.target as HTMLDivElement).outerText;
    if (outerText || outerText === '') {
      setShowPlaceholder(outerText);
    }
  }

  const htmlValue = showPlaceholder.length > 0 ? value : '<p>Description</p>';

  return (
    <Box contentEditable={true}
      ref={ref}
      sx={styles}
      onKeyDown={onChange}
      dangerouslySetInnerHTML={{__html: htmlValue}}>
    </Box>
  );
});


const styles = {
  '&:focus-visible': {
    border: 'none',
    outline: 'none',
  },
  '& p': {
    color: '#a2a2a2',
    fontSize: '16px',
  },
  'color': 'ligthgray',
  'fontSize': '17px',
}

export default LabelInput;
