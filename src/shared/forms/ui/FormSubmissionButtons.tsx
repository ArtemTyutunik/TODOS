import React from 'react';
import {Box, Button, Theme} from '@mui/material';
import SpinnerComponent from '@shared/components/SpinnerComponent/SpinnerComponent';

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
    onSubmit?: (e: React.SyntheticEvent) => void,
    withLoading?: boolean
}
const FormSubmissionButtons = ({isValid, onClose, onSubmit, withLoading}: Props) => {
  return (
    <Box display={'flex'} marginTop={'5px'} justifyContent={'flex-end'}>
      <Button variant="contained" color={'inherit'}
        sx={CancelButtonStyles}
        onClick={onClose}>
          Cancel
      </Button>
      <Button variant="contained"
        type={'submit'}
        onClick={onSubmit}
        disabled={!isValid}
        sx={{textTransform: 'initial', display: 'flex'}}>
        {withLoading && <SpinnerComponent size={'small'}/>}
        Submit
      </Button>
    </Box>
  );
};

export default FormSubmissionButtons;
