import React from 'react';
import {Button} from '@mui/material';
import {Control, useFormState} from 'react-hook-form';
import {IFormInputs} from '@shared/forms/interfaces/interfaces';


interface Props {
    control: Control<IFormInputs>,
    children: React.ReactNode,
    pending?: boolean,
}

const SubmitButton = ({control, children, pending = false}: Props) => {
  const {isValid} = useFormState({control});

  return (
    <Button
      type="submit"
      fullWidth
      disabled={!isValid && !pending}
      variant="contained"
      sx={{mt: '10px', mb: 2}}
    >
      {children}
    </Button>
  );
};

export default SubmitButton;
