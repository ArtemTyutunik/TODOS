import React from 'react';
import {Box, Modal} from '@mui/material';

const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  height: 'auto',
  backgroundColor: 'background.paper',
  border: 'none',
  borderRadius: '12px',
  boxShadow: 24,
  padding: '10px',
};

interface Props {
  children?: React.ReactElement;
  open: boolean,
  onClose: () => void
}

const BasicModal = ({children, open, onClose}: Props) => {
  return <Modal open={open} onClose={onClose}>
    <Box sx = {style}>
      {children}
    </Box>
  </Modal>;
};

export default BasicModal;
