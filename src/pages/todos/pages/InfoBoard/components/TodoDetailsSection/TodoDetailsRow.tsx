import React from 'react';
import {styled} from '@mui/material/styles';
import {Box} from '@mui/material';

interface Props {
    name: string;
    children: React.ReactNode;
}
const TodoDetailsRow = (props: Props) => {
  const {name, children} = props

  return (
    <TodoDetailsSectionRow>
      <Box width={'40%'}>
        {name}
      </Box>
      <Box width={'60%'} className={'row-value'}>
        {children}
      </Box>

    </TodoDetailsSectionRow>
  );
};

const TodoDetailsSectionRow = styled(Box)(() => ({
  'display': 'flex',
  'justifyContent': 'space-between',
  'alignItems': 'center',
  'padding': '10px 10px',

  '& .row-value': {
    'padding': '5px',
    'borderRadius': '4px',
    '&:hover': {
      'backgroundColor': '#dfe1e6',
    },
  },
}))

export default TodoDetailsRow;
