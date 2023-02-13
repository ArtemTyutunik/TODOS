import React from 'react';
import {Box, Modal} from '@mui/material';

interface Props {
    children?: React.ReactElement;
    open: boolean,
    onClose: () => void
}


const style = {
  position: 'absolute',
  top: '20%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '600px',
  width: 'auto',
  height: 'auto',
  backgroundColor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 4,
};

const BasicModal = ({children, open, onClose}: Props) => {
  return <Modal open={open} onClose={onClose}>
    <Box sx = {style}>
      {children}
    </Box>
  </Modal>;
};

export default BasicModal;
