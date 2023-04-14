import React from 'react';
import {Box, Button, Theme} from '@mui/material';

const CancelButtonStyles = (theme: Theme) => ({
  marginRight: '15px',
  textTransform: 'initial',
  backgroundColor: theme.background.lightGrey,
  color: '#444',
  fontSize: '13px',
  boxShadow: 'none',
  padding: '1px 10px',
});

interface Props {
    isValid: boolean,
    onClose: () => void
}
const FormSubmissionButtons = ({isValid, onClose}: Props) => {
  return (
    <Box display={'flex'} marginTop={'5px'} justifyContent={'flex-end'}>
      <Button variant="contained" color={'inherit'}
        sx={CancelButtonStyles}
        onClick={onClose}>
          Cancel
      </Button>
      <Button variant="contained"
        type={'submit'}
        disabled={!isValid}
        sx={{textTransform: 'initial'}}>
          Submit
      </Button>
    </Box>
  );
};

export default FormSubmissionButtons;
