import React, {forwardRef} from 'react';
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
};

interface Props {
  children?: React.ReactElement;
  open: boolean,
  onClose: () => void
}

const BasicModal = forwardRef(({children, open, onClose}: Props, ref: React.ForwardedRef<HTMLDivElement> | null) => {
  return <Modal open={open} onClose={onClose} ref={ref}>
    <Box sx = {style}>
      {children}
    </Box>
  </Modal>;
});

export default BasicModal;
