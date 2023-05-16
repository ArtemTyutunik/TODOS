import React from 'react';
import {Button} from '@mui/material';
import {Control, useFormState} from 'react-hook-form';
import {IFormInputs} from '@shared/forms/interfaces/interfaces';


interface Props {
    control: Control<IFormInputs>,
    children: React.ReactNode
}

const SubmitButton = ({control, children}: Props) => {
  const {isValid} = useFormState({control});

  return (
    <Button
      type="submit"
      fullWidth
      disabled={!isValid}
      variant="contained"
      sx={{mt: 3, mb: 2}}
    >
      {children}
    </Button>
  );
};

export default SubmitButton;
