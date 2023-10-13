import React from 'react';
import {Box} from '@mui/material';
import {styled} from '@mui/material/styles';
import ToggleArrowButton from '@shared/components/toggleArrowIcon';
import TodoDetailsRow from '../TodoDetailsSection/TodoDetailsRow';

const TodoDetailsSection = () => {
  return (
    <Box width={'100%'} border={'1px solid #e0e0e0'} borderRadius={'7px'} overflow={'hidden'}>
      <TodoDetailsSectionHeader>
        <span>
          Details
        </span>
        {/*@ts-ignore*/}
        <ToggleArrowButton isExpanded
          sx={{transform: 'rotate(180deg)', marginRight: '10px'}}/>
      </TodoDetailsSectionHeader>
      <TodoDetailsSectionBody>
        <TodoDetailsRow name={'Todo'}>
        </TodoDetailsRow>

      </TodoDetailsSectionBody>
    </Box>
  );
};

const TodoDetailsSectionHeader = styled(Box)(() => ({
  'display': 'flex',
  'justifyContent': 'space-between',
  'alignItems': 'center',
  'background': '#fff',
  'padding': '15px 10px',
  'fontWeight': '600',
  'fontSize': '16px',
  'color': '#172b4d',
  'position': 'sticky',
  'top': '0',
  'left': '0',

  '&:hover': {
    backgroundColor: '#dfe1e6',
  },
}))

const TodoDetailsSectionBody = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  borderTop: '1px solid #e0e0e0',
}))


export default TodoDetailsSection;
