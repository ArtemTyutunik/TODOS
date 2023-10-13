import React, {memo, useEffect, useState} from 'react';
import {Box, MenuItem, Select, SelectChangeEvent} from '@mui/material';
import {styled} from '@mui/material/styles';

interface Props {
  isComplete: boolean
}
const CompleteHandler = memo(({isComplete}: Props) => {
  const [value, setValue] = useState<string>('');


  const onChange = (e: SelectChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value as string;
    setValue(newValue);
  }

  useEffect(() => {
    setValue(isComplete + '');
  }, [isComplete])


  return (
    <>
      <Button>
        {/*@ts-ignore*/}
        <CustomSelect value={value} onChange={onChange}>
          <MenuItem value={'true'}>Complete</MenuItem>
          <MenuItem value={'false'}>In Progress</MenuItem>
        </CustomSelect>
      </Button>
    </>

  );
});


const Button = styled(Box)(({theme}) => ({
  'width': 'auto',
  'height': 'auto',
  'display': 'inline-block',
  'fontFamily': theme.typography.fontFamily,
  'cursor': 'pointer',
  'borderRadius': '4px',
  'border': '1px solid #e0e0e0',
  'backgroundColor': '#0052cc',
  'fontWeight': '600',
  'fontSize': '14px',
  'marginBottom': '20px',
  'transform': 'translateX(8px)',
  '&:hover': {
    backgroundColor: '#0062cc',
    borderColor: '#0062cc',
    color: '#fff',
  },
}))

const CustomSelect = styled(Select)(() => ({
  'width': '100%',

  '& .MuiSelect-select': {
    padding: '5px 30px !important',
    color: '#fff',
  },
  '& fieldset': {
    border: 'none',
  },
  '& svg': {
    color: '#fff',
  },
}))

export default CompleteHandler;
