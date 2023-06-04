import BasicModal from '@shared/components/modal';
import {Box, Typography} from '@mui/material';
import FormSubmissionButtons from '@shared/forms/ui/FormSubmissionButtons';
import React from 'react';

interface Props {
    isOpen: boolean,
    onClose: () => void,
    onSubmit: () => void
}

export default function ConfirmDeleteModal({isOpen, onClose, onSubmit}: Props) {
  return <BasicModal open={isOpen} onClose={onClose}>
    <Box padding={'10px'}>
      <Typography sx={(theme) => ({color: theme.text.main, padding: '20px 10px'})}>
                Are you sure that you want to delete this?
      </Typography>
      <FormSubmissionButtons isValid={true} onClose={onClose} onSubmit={onSubmit}/>
    </Box>
  </BasicModal>
}
